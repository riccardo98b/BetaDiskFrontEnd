import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

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

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.signinForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
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
