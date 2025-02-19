import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ClienteService } from '../../servizi/cliente/cliente.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UtenteService } from '../../servizi/utente/utente.service';
import { catchError, of, switchMap } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profilo',
  standalone: false,
  templateUrl: './profilo.component.html',
  styleUrls: ['./profilo.component.css'],
})
export class ProfiloComponent implements OnInit {
  clienteId: number = 0;
  utenteId: number = 0;
  clienteForm!: FormGroup;
  @Input() editMode: boolean = false;
  @Input() isRegistrazione: boolean = false;
  dataRegistrazione: string = localStorage.getItem('dataRegistrazione');
  immagineDefault: string =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
  // Messaggi di errore
  constructor(
    private clienteService: ClienteService,
    private utenteService: UtenteService,
    private router: Router
  ) {}

  inizializzaForm(): void {
    (this.clienteForm = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      cognome: new FormControl('', [Validators.required]),
      immagineCliente: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefono: new FormControl('', [Validators.required]),
      username: new FormControl(''),

      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      passwordDiConferma: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]), // Aggiungi questo campo

      via: new FormControl('', [Validators.required]),
      comune: new FormControl('', [Validators.required]),
      provincia: new FormControl('', [Validators.required]),
      cap: new FormControl('', [Validators.required]),
    })),
      { validators: this.passwordMatchValidator };
  }

  loadDatiCliente(): void {
    if (!this.isRegistrazione) {
      this.clienteId = +localStorage.getItem('idCliente')!;
      this.utenteId = +localStorage.getItem('idUtente')!;

      this.clienteService
        .getCliente(this.clienteId)
        .pipe(
          catchError((error) => {
            console.error(
              'Errore durante il caricamento dei dati del cliente:',
              error
            );
            return of(null);
          })
        )
        .subscribe((response: any) => {
          const clienteData = response.dati;
          this.clienteForm.patchValue({
            nome: clienteData.nome,
            cognome: clienteData.cognome,
            immagineCliente: clienteData.immagineCliente,
            email: clienteData.utente.email,
            telefono: clienteData.telefono,
            username: clienteData.utente.username,
            password: clienteData.utente.password,
            via: clienteData.via,
            comune: clienteData.comune,
            provincia: clienteData.provincia,
            cap: clienteData.cap,
          }),
            console.log(response);
        });
    }
  }

  ngOnInit(): void {
    this.inizializzaForm();

    if (!this.isRegistrazione) {
      this.loadDatiCliente();
    }
  }

  onEditUser() {
    this.editMode = !this.editMode;
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const passwordDiConferma = formGroup.get('passwordDiConferma')?.value;

    if (password !== passwordDiConferma) {
      formGroup.get('passwordDiConferma')?.setErrors({ mismatch: true });
    } else {
      return;
    }
  }

  onSubmit() {
    console.log('Dati inviati');
    this.checkIfBothPasswordsAreEqual();

    let clienteInvioForm = {
      idCliente: this.clienteId,
      nome: this.clienteForm.value.nome,
      cognome: this.clienteForm.value.cognome,
      immagineCliente: this.clienteForm.value.immagineCliente,
      telefono: this.clienteForm.value.telefono,
      via: this.clienteForm.value.via,
      comune: this.clienteForm.value.comune,
      provincia: this.clienteForm.value.provincia,
      cap: this.clienteForm.value.cap,
    };

    let utenteInvioForm = {
      idUtente: this.utenteId,
      idCliente: this.clienteId,
      email: this.clienteForm.value.email,
      password: this.clienteForm.value.password
        ? this.clienteForm.value.password
        : null,
      username: this.clienteForm.value.username,
      roles: 'UTENTE',
      isAdmin: false,
    };

    let isAdmin = false;
    if (isAdmin) {
      utenteInvioForm.isAdmin = true;
    }
    console.log('Cliente da inviare:', clienteInvioForm);
    console.log('Utente da inviare:', utenteInvioForm);
    // aggiorno le 2 entita
    this.clienteService
      .updateCliente(clienteInvioForm)
      .pipe(
        switchMap((clienteResponse) => {
          console.log('Cliente aggiornato:', clienteResponse);
          return this.utenteService.updateUtente(utenteInvioForm);
        }),
        catchError((errore) => {
          console.log("Errore durante l'aggiornamento:", errore);
          return of(null);
        })
      )
      .subscribe((utenteResponse) => {
        if (utenteResponse) {
          console.log('Utente aggiornato:', utenteResponse);
          this.resetPasswordAfterSubmit();
          this.editMode = false;
        } else {
          console.log("Non è stato possibile aggiornare l'utente");
        }
      });
  }

  resetPasswordAfterSubmit() {
    this.clienteForm.patchValue({
      password: '',
      passwordDiConferma: '',
    });
  }

  onRegistraCliente() {
    console.log('Registrazione in corso');
    this.checkIfBothPasswordsAreEqual();

    //let clienteInvioForm
    let clienteInvioForm = {
      //utenteInvioForm
      nome: this.clienteForm.value.nome,
      cognome: this.clienteForm.value.cognome,
      immagineCliente:
        this.clienteForm.value.immagineCliente || this.immagineDefault,
      telefono: this.clienteForm.value.telefono,
      via: this.clienteForm.value.via,
      comune: this.clienteForm.value.comune,
      provincia: this.clienteForm.value.provincia,
      cap: this.clienteForm.value.cap,
    };

    this.clienteService
      .createCliente(clienteInvioForm)
      .pipe(
        switchMap((clienteResponse: any) => {
          if (clienteResponse) {
            console.log('Cliente creato:', clienteResponse);

            const clienteId = clienteResponse.dati.idCliente;
            console.log(
              'Cliente creato con ID:',
              clienteResponse.dati.idCliente
            );

            let utenteInvioForm = {
              email: this.clienteForm.value.email,
              password: this.clienteForm.value.password,
              username: this.clienteForm.value.username,
              roles: 'UTENTE',
              isAdmin: false,
              idCliente: clienteId,
            };
            return this.utenteService.createUtente(utenteInvioForm);
          } else {
            throw new Error("Errore nella creazione dell'utente");
          }
        }),
        catchError((errore) => {
          console.log(
            'Errore durante la registrazione del cliente e/o utente:',
            errore
          );
          return of(null);
        })
      )
      .subscribe((utenteResponse: any) => {
        if (utenteResponse) {
          console.log('Utente creato:', utenteResponse);
          this.resetPasswordAfterSubmit();
          this.router.navigate(['/']);
        } else {
          console.log("Non è stato possibile creare l'utente");
        }
      });
  }

  checkIfBothPasswordsAreEqual(): void {
    if (
      this.clienteForm.value.password !==
      this.clienteForm.value.passwordDiConferma
    ) {
      console.log('Le password non corrispondono.');
      return;
    }
  }
}
