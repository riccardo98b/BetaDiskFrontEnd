import { Component } from '@angular/core';
import { ClienteService } from '../../../servizi/cliente/cliente.service';
import { UtenteService } from '../../../servizi/utente/utente.service';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';
import { MailService } from '../../../servizi/mail/mail.service';
import { ProfiloService } from '../../../servizi/profilo/profilo.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, catchError, of, switchMap } from 'rxjs';
import { DialogConfermaComponent } from '../../../dialog/dialog-conferma/dialog-conferma/dialog-conferma.component';

@Component({
  selector: 'app-crea-admin',
  standalone: false,
  templateUrl: './crea-admin.component.html',
  styleUrl: './crea-admin.component.css',
})
export class CreaAdminComponent {
  onDisplayChoice() {
    throw new Error('Method not implemented.');
  }
  sceltaForm: string = 'admin-no-cliente';
}
