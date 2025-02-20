import { Component } from '@angular/core';
import { ClienteService } from '../../servizi/cliente/cliente.service';
import { UtenteService } from '../../servizi/utente/utente.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.component.html',
  styleUrls: ['./registrazione.component.css'],
  standalone: false,
})
export class RegistrazioneComponent {
  clienteForm: FormGroup;

  constructor(
    private clienteService: ClienteService,
    private utenteService: UtenteService
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
    });
  }
}
