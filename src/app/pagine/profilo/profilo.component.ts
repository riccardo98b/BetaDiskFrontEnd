import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../servizi/cliente/cliente.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UtenteService } from '../../servizi/utente/utente.service';
import { catchError, of, switchMap } from 'rxjs';
import { messaggiErroreCliente } from '../../shared/messaggiErrore';
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
  editMode: boolean = false;
  dataRegistrazione: Date;
  immagineDefault: string =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
  // Messaggi di errore
  messaggiErroreCliente = messaggiErroreCliente;
  constructor(
    private clienteService: ClienteService,
    private utenteService: UtenteService
  ) {}

  ngOnInit(): void {
    this.clienteId = +sessionStorage.getItem('idCliente')!;
    this.utenteId = +sessionStorage.getItem('idUtente')!;
    (this.clienteForm = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      cognome: new FormControl('', [Validators.required]),
      immagineCliente: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefono: new FormControl('', [Validators.required]),
      username: new FormControl(''),
      vecchiaPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
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

    this.clienteService.getCliente(this.clienteId).subscribe(
      (response: any) => {
        const clienteData = response.dati;
        this.dataRegistrazione = clienteData.dataRegistrazione;
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
      },
      (error: any) => {
        console.error('Errore:', error);
      }
    );
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
    if (
      this.clienteForm.value.password !==
      this.clienteForm.value.passwordDiConferma
    ) {
      console.log('Le password non corrispondono.');
      return;
    }

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
      roles: 'USER',
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
}
