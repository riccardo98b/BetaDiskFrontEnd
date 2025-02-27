import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../../../servizi/cliente/cliente.service';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';
import { UtenteService } from '../../../servizi/utente/utente.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfermaComponent } from '../../../dialog/dialog-conferma/dialog-conferma/dialog-conferma.component';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-cancella-account',
  templateUrl: './cancella-account.component.html',
  styleUrls: ['./cancella-account.component.css'],
  standalone: false,
})
export class CancellaAccountComponent {
  passwordForm!: FormGroup;
  passwordCorrenteVisibile: boolean = false;
  passwordDiConfermaVisibile: boolean = false;
  messaggioErrore: string | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private utenteService: UtenteService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    console.log('Inizializzazione del componente');
    this.inizializzaForm();
  }

  inizializzaForm(): void {
    console.log('Inizializzando il form di cancellazione account');
    this.passwordForm = new FormGroup(
      {
        passwordCorrente: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
        passwordDiConferma: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
      },
      { validators: this.passwordMatchValidator }
    );
  }

  createUtenteFormData(): any {
    return {
      idUtente: this.authService.getUtenteIdSessione(),
    };
  }

  toggleVisibilitaPasswordCorrente(): void {
    this.passwordCorrenteVisibile = !this.passwordCorrenteVisibile;
  }

  toggleVisibilitaPasswordConferma(): void {
    this.passwordDiConfermaVisibile = !this.passwordDiConfermaVisibile;
  }

  onSubmit(): void {
    if (this.passwordForm.invalid) {
      return;
    }

    const passwordCorrente = this.passwordForm.get('passwordCorrente')?.value;
    const utenteInvioForm = this.createUtenteFormData();
    const idUtente = this.authService.getUtenteIdSessione();
    this.utenteService
      .verifyCurrentPassword(idUtente, passwordCorrente)
      .subscribe(
        (response) => {
          console.log('Password verificata con successo');
          console.log('Risposta della verifica password:', response);

          const dialogRef = this.dialog.open(DialogConfermaComponent, {
            minWidth: '500px',
            data: {
              messaggio: 'Sei sicuro di voler eliminare il tuo account?',
            },
          });

          dialogRef.afterClosed().subscribe((confirmed) => {
            if (confirmed) {
              console.log('Utente ha confermato la cancellazione');
              this.eliminaAccount(utenteInvioForm);
            } else {
              console.log('Utente ha annullato la cancellazione');
            }
          });
        },
        (errore) => {
          console.log('Errore durante la verifica della password');
          this.messaggioErrore = 'Password non corretta';
          this.gestisciErrore(
            errore,
            'Errore durante la modifica della password'
          );
        }
      );
  }

  get passwordMatchValidator(): any {
    return (formGroup: FormGroup) => {
      const password = formGroup.get('passwordCorrente')?.value;
      const confirmPassword = formGroup.get('passwordDiConferma')?.value;
      if (password !== confirmPassword) {
        console.log('Le password non corrispondono');
        formGroup.get('passwordDiConferma')?.setErrors({ mismatch: true });
      } else {
        console.log('Le password corrispondono');
        formGroup.get('passwordDiConferma')?.setErrors(null);
      }
    };
  }

  eliminaAccount(idUtente: number): void {
    console.log(
      `Tentativo di eliminare l'account per l'utente con ID: ${idUtente}`
    );
    this.utenteService.deleteUtente(idUtente).subscribe(
      (response) => {
        console.log('Account eliminato con successo');
        console.log('Risposta della cancellazione:', response);

        this.authService.logout();
        console.log('Utente disconnesso');

        localStorage.clear();
        console.log('LocalStorage pulito');

        this.router.navigate(['/']);
        console.log('Torna alla home');
      },
      (errore) => {
        console.log("Errore durante l'eliminazione dell'account");
        this.messaggioErrore = "Errore durante l'eliminazione dell'account";
        this.gestisciErrore(
          errore,
          "Errore durante l'eliminazione dell'account"
        );
      }
    );
  }

  gestisciErrore(errore: any, erroreMsg: string): Observable<any> {
    console.error(erroreMsg, errore);
    return of(null);
  }
}
