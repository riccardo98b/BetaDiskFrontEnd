import { Component, Input, OnInit } from '@angular/core';
import { ClienteService } from '../../servizi/cliente/cliente.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UtenteService } from '../../servizi/utente/utente.service';
import { Observable, catchError, of, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { MailService } from '../../servizi/mail/mail.service';
import { ProfiloService } from '../../servizi/profilo/profilo.service';
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
  nomeClienteBenvenuto: string = '';
  passwordVisibile: boolean = false;

  constructor(
    private clienteService: ClienteService,
    private utenteService: UtenteService,
    private router: Router,
    private authService: AuthService,
    private mailService: MailService,
    private profiloService: ProfiloService
  ) {}

  ngOnInit(): void {
    this.inizializzaForm();
    if (!this.isRegistrazione) {
      this.loadDatiCliente();
    }
  }

  inizializzaForm(): void {
    this.clienteForm = new FormGroup(
      {
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
        ]),
        via: new FormControl('', [Validators.required]),
        comune: new FormControl('', [Validators.required]),
        provincia: new FormControl('', [Validators.required]),
        cap: new FormControl('', [Validators.required]),
      },
      { validators: this.passwordMatchValidator }
    );
  }

  loadDatiCliente(): void {
    if (!this.isRegistrazione) {
      this.clienteId = this.authService.getClienteIdSessione();
      this.utenteId = this.authService.getUtenteIdSessione();

      this.clienteService
        .getCliente(this.clienteId)
        .pipe(
          catchError((errore) =>
            this.gestisciErrore(
              errore,
              "'Errore durante il caricamento dati del cliente:'"
            )
          )
        )
        .subscribe((response: any) =>
          this.populateFormWithDatiCliente(response)
        );
    }
  }

  populateFormWithDatiCliente(response: any): void {
    const clienteData = response.dati;
    this.profiloService.setNomeCliente(`${clienteData.nome}`);
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
    });
  }

  onEditUser(): void {
    this.editMode = !this.editMode;
  }

  get passwordMatchValidator(): any {
    return (formGroup: FormGroup) => {
      const password = formGroup.get('password')?.value;
      const confirmPassword = formGroup.get('passwordDiConferma')?.value;
      if (password !== confirmPassword) {
        formGroup.get('passwordDiConferma')?.setErrors({ mismatch: true });
      } else {
        formGroup.get('passwordDiConferma')?.setErrors(null);
      }
    };
  }

  onSubmit(): void {
    this.checkIfBothPasswordsAreEqual();
    this.invioDatiCliente();
  }

  invioDatiCliente(): void {
    const clienteInvioForm = this.createClienteFormData();
    const utenteInvioForm = this.createUtenteFormData();

    this.clienteService
      .updateCliente(clienteInvioForm)
      .pipe(
        switchMap((clienteResponse) => {
          return this.utenteService.updateUtente(utenteInvioForm);
        }),
        catchError((errore) => {
          return this.gestisciErrore(errore, "Errore durante l'aggiornamento:");
        })
      )
      .subscribe((utenteResponse) => {
        this.gestioneRispostaUpdate(utenteResponse);
      });
  }

  createClienteFormData(): any {
    return {
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
  }

  createUtenteFormData(): any {
    return {
      idUtente: this.utenteId,
      idCliente: this.clienteId,
      email: this.clienteForm.value.email,
      password: this.clienteForm.value.password || null,
      username: this.clienteForm.value.username,
      roles: 'UTENTE',
      isAdmin: false,
    };
  }

  gestioneRispostaUpdate(utenteResponse: any): void {
    if (utenteResponse) {
      this.resetPasswordAfterSubmit();
      this.editMode = false;
      window.location.reload();
    } else {
      console.log("Non è stato possibile aggiornare l'utente");
    }
  }

  resetPasswordAfterSubmit(): void {
    this.clienteForm.patchValue({
      password: '',
      passwordDiConferma: '',
    });
  }
  toggleVisibilitaPassword() {
    this.passwordVisibile = !this.passwordVisibile;
  }
  onRegistraCliente(): void {
    this.checkIfBothPasswordsAreEqual();
    this.registraClienteEUtente();
  }

  registraClienteEUtente(): void {
    const clienteInvioForm = this.createClienteFormDatiRegistrazione();
    this.clienteService
      .createCliente(clienteInvioForm)
      .pipe(
        switchMap((clienteResponse: any) =>
          this.createUtentePerNuovoCliente(clienteResponse)
        ),
        catchError((errore) =>
          this.gestisciErrore(
            errore,
            "'Errore durante la registrazione del cliente e/o utente:'"
          )
        )
      )
      .subscribe((utenteResponse: any) => {
        this.gestioneRispostaRegistrazione(utenteResponse);
      });
  }

  createClienteFormDatiRegistrazione(): any {
    return {
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
  }

  createUtentePerNuovoCliente(clienteResponse: any): any {
    const clienteId = clienteResponse.dati.idCliente;
    const utenteInvioForm = {
      email: this.clienteForm.value.email,
      password: this.clienteForm.value.password,
      username: this.clienteForm.value.username,
      roles: 'UTENTE',
      isAdmin: false,
      idCliente: clienteId,
    };
    return this.utenteService.createUtente(utenteInvioForm);
  }

  gestioneRispostaRegistrazione(utenteResponse: any): void {
    if (utenteResponse) {
      this.resetPasswordAfterSubmit();
      this.invioEmailRegistrazione();
      this.router.navigate(['/']);
    } else {
      console.log("Non è stato possibile creare l'utente");
    }
  }

  checkIfBothPasswordsAreEqual(): void {
    if (
      this.clienteForm.value.password !==
      this.clienteForm.value.passwordDiConferma
    ) {
      console.log('Le password non corrispondono.');
    }
  }

  gestisciErrore(errore: any, erroreMsg: string): Observable<any> {
    console.error(erroreMsg, errore);
    return of(null);
  }

  invioEmailRegistrazione(): void {
    const mailRequest = {
      toEmail: this.clienteForm.value.email,
      nome: this.clienteForm.value.nome,
      cognome: this.clienteForm.value.cognome,
    };
    this.mailService.confermaRegistrazione(mailRequest).subscribe(
      (response) => {
        console.log('Email di conferma registrazione inviata ', response);
      },
      (error) => {
        console.error("Errore durante l'invio della email:", error);
      }
    );
  }
}
