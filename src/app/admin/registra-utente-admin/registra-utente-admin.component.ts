import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MailService } from '../../servizi/mail/mail.service';
import { UtenteService } from '../../servizi/utente/utente.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { PopUpComponent } from '../../dialog/pop-up/pop-up.component';

@Component({
  selector: 'app-registra-utente-admin',
  standalone: false,
  templateUrl: './registra-utente-admin.component.html',
  styleUrls: ['./registra-utente-admin.component.css'],
})
export class RegistraUtenteAdminComponent {
  utenteId: number = 0;
  utenteForm!: FormGroup;
  passwordVisibile: boolean = false;
  randomPassword: string = '';

  constructor(
    private utenteService: UtenteService,
    private router: Router,
    private authService: AuthService,
    private mailService: MailService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    console.log('Inizializzazione del componente...');
    this.inizializzaForm();
  }

  inizializzaForm(): void {
    console.log('Inizializzo il form utente...');
    this.utenteForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', Validators.required),
    });
    console.log('Form utente inizializzato:', this.utenteForm);
  }

  onSubmit(): void {
    console.log('Submit del form...');
    this.registraUtente();
  }

  registraUtente(): void {
    console.log('Inizio registrazione utente...');
    const utenteInvioForm = this.createUtenteFormData();
    console.log('Dati utente da inviare:', utenteInvioForm);

    this.utenteService
      .createUtente(utenteInvioForm)
      .pipe(
        catchError((errore) => {
          console.error("Errore nella registrazione dell'utente:", errore);
          return this.gestisciErrore(
            errore,
            "Errore durante la registrazione dell'utente:"
          );
        })
      )
      .subscribe((utenteResponse) => {
        console.log(
          "Risposta dalla registrazione dell'utente:",
          utenteResponse
        );
        this.gestioneRispostaRegistrazione(utenteResponse);
      });
  }

  createUtenteFormData(): any {
    console.log('Generazione della password random...');
    this.randomPassword = this.generateRandomPassword(12);
    console.log('Password random generata:', this.randomPassword);

    const formData = {
      email: this.utenteForm.value.email,
      password: this.randomPassword,
      username: this.utenteForm.value.username,
      roles: 'ADMIN',
    };
    console.log('Dati per la registrazione utente:', formData);
    return formData;
  }

  gestioneRispostaRegistrazione(utenteResponse: any): void {
    console.log('Gestisco la risposta della registrazione...');
    if (utenteResponse && utenteResponse.rc) {
      console.log('Registrazione completata con successo.');
      this.invioEmailRegistrazione();
      this.openDialog({
        titolo: 'Conferma',
        msg: 'Registrazione utente completata con successo.',
        reload: true,
      });
      this.router.navigate(['/admin/dashboard/welcome-page']);
    } else {
      console.log('Errore nella registrazione:', utenteResponse.msg);
      this.openDialog({
        titolo: 'Errore',
        msg:
          utenteResponse.msg ||
          'Si è verificato un errore durante la registrazione.',
        reload: false,
      });
      this.router.navigate(['/admin/dashboard/crea-admin']);
    }
  }

  generateRandomPassword(length: number): string {
    console.log(
      `Generazione di una password casuale di lunghezza ${length}...`
    );
    const charset =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    console.log('Password generata:', password);
    return password;
  }

  gestisciErrore(errore: any, erroreMsg: string): Observable<any> {
    console.error(erroreMsg, errore);
    this.openDialog({
      titolo: 'Errore',
      msg: erroreMsg,
      reload: false,
    });
    return of(null);
  }

  invioEmailRegistrazione(): void {
    console.log('Invio email di registrazione...');
    const mailRequest = {
      toEmail: this.utenteForm.value.email,
      username: this.utenteForm.value.username,
      password: this.randomPassword,
    };
    this.mailService
      .confermaRegistrazioneAdminNonCliente(mailRequest)
      .subscribe(
        (response) => {
          console.log('Email di conferma registrazione inviata:', response);
        },
        (error) => {
          console.error("Errore nell'invio della email:", error);
        }
      );
  }

  openDialog(inputDialog: any): void {
    console.log('Apro il dialogo con i seguenti dati:', inputDialog);
    const dialogRef = this.dialog.open(PopUpComponent, {
      width: '400px',
      data: {
        titolo: inputDialog.titolo,
        msg: inputDialog.msg,
        reload: inputDialog.reload,
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('Dialogo chiuso.');
      if (inputDialog.reload) {
        console.log('Ricarico la pagina...');
        window.location.reload();
      } else {
        console.log('Reindirizzo alla homepage...');
        this.router.navigate(['/']);
      }
    });
  }
}
