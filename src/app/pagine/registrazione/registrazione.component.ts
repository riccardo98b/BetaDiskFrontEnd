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
export class RegistrazioneComponent {}
