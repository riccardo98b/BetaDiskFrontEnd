import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { ProfiloService } from '../../servizi/profilo/profilo.service';

@Component({
  selector: 'app-signin',
  standalone: false,
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
  signinForm: FormGroup;
  logged = false;
  messaggioErrore: string | null = null;
  ruoloUtente: string | null = null;
  idUtente: number | null = null;
  idCliente: number | null = null;
  dataRegistrazione: Date | null = null;
  passwordVisibile: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService //
  ) {}

  ngOnInit(): void {
    const usernamePattern = '^[a-zA-Z0-9-_]{3,15}$'; // Solo lettere, numeri, trattini, underscores, 3-15 caratteri

    this.signinForm = this.formBuilder.group({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
        Validators.pattern(usernamePattern),
      ]),
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  toggleVisibilitaPassword() {
    this.passwordVisibile = !this.passwordVisibile;
  }

  onSubmit(): void {
    if (this.signinForm.invalid) {
      return;
    }

    const datiAccesso = this.signinForm.value;

    this.authService.signInUtente(datiAccesso).subscribe(
      (response) => {
        if (response.logged) {
          this.logged = true;
          this.messaggioErrore = null;
        } else {
          this.logged = false;
          this.messaggioErrore =
            'Utente non trovato o dati di accesso non corretti';
        }
      },
      (error) => {
        this.logged = false;
        this.messaggioErrore = 'Si è verificato un errore. Riprova più tardi';
        console.error(error);
      }
    );
  }
}
