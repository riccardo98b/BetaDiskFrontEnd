import { Component } from '@angular/core';
import { ClienteService } from '../../servizi/cliente/cliente.service';
import { UtenteService } from '../../servizi/utente/utente.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { switchMap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { ProfiloService } from '../../servizi/profilo/profilo.service';
import { MailService } from '../../servizi/mail/mail.service';
import { DialogConfermaComponent } from '../../dialog/dialog-conferma/dialog-conferma/dialog-conferma.component';

@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.component.html',
  styleUrls: ['./registrazione.component.css'],
  standalone: false,
})
export class RegistrazioneComponent {
  clienteId: number = 0;
  utenteId: number = 0;
  clienteForm!: FormGroup;
  dataRegistrazione: string = localStorage.getItem('dataRegistrazione');
  immagineDefault: string =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
  passwordVisibile: boolean = false;
  randomPassword: string = '';

  constructor(
    private clienteService: ClienteService,
    private utenteService: UtenteService,
    private router: Router,
    private authService: AuthService,
    private mailService: MailService,
    private profiloService: ProfiloService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.inizializzaForm();
  }

  inizializzaForm(): void {
    this.clienteForm = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      cognome: new FormControl('', [Validators.required]),
      immagineCliente: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefono: new FormControl('', [Validators.required]),
      username: new FormControl(''),
      via: new FormControl('', [Validators.required]),
      comune: new FormControl('', [Validators.required]),
      provincia: new FormControl('', [Validators.required]),
      cap: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(): void {
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
      username: this.clienteForm.value.username,
      roles: 'UTENTE',
    };
  }

  gestioneRispostaUpdate(utenteResponse: any): void {
    if (utenteResponse) {
      this.resetPasswordAfterSubmit();
      window.location.reload();
    } else {
      console.log("Non è stato possibile aggiornare l'utente");
    }
  }

  generateRandomPassword(length: number): string {
    const charset =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
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
    this.registraClienteEUtente();
  }

  registraClienteEUtente(): void {
    const clienteInvioForm = this.createClienteFormDatiRegistrazione();
    const randomPassword = this.generateRandomPassword(12);

    this.clienteService
      .createCliente(clienteInvioForm)
      .pipe(
        switchMap((clienteResponse: any) =>
          this.createUtentePerNuovoCliente(clienteResponse, randomPassword)
        ),
        catchError((errore) =>
          this.gestisciErrore(
            errore,
            "'Errore durante la registrazione del cliente e/o utente:'"
          )
        )
      )
      .subscribe((utenteResponse: any) => {
        this.gestioneRispostaRegistrazione(utenteResponse, randomPassword);
        const dialogRef = this.dialog.open(DialogConfermaComponent, {
          minWidth: '500px',
          data: {
            messaggio:
              'Registrazione avvenuta con successo, controlla la tua email.',
          },
        });

        dialogRef.afterClosed().subscribe((result) => {
          console.log('Dialog di conferma chiuso con risultato: ', result);
        });
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

  createUtentePerNuovoCliente(
    clienteResponse: any,
    randomPassword: string
  ): any {
    const clienteId = clienteResponse.dati.idCliente;
    const utenteInvioForm = {
      email: this.clienteForm.value.email,
      password: randomPassword,
      username: this.clienteForm.value.username,
      roles: 'UTENTE',
      idCliente: clienteId,
    };
    return this.utenteService.createUtente(utenteInvioForm);
  }

  gestioneRispostaRegistrazione(
    utenteResponse: any,
    randomPassword: string
  ): void {
    if (utenteResponse) {
      this.resetPasswordAfterSubmit();
      this.invioEmailRegistrazione(randomPassword);
      this.router.navigate(['/']);
    } else {
      console.log("Non è stato possibile creare l'utente");
    }
  }

  gestisciErrore(errore: any, erroreMsg: string): Observable<any> {
    console.error(erroreMsg, errore);
    return of(null);
  }

  invioEmailRegistrazione(randomPassword: string): void {
    const mailRequest = {
      toEmail: this.clienteForm.value.email,
      nome: this.clienteForm.value.nome,
      cognome: this.clienteForm.value.cognome,
      password: randomPassword,
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
