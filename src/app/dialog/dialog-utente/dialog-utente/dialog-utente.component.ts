import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtenteService } from '../../../servizi/utente/utente.service';

@Component({
  selector: 'app-dialog-utente',
  templateUrl: './dialog-utente.component.html',
  styleUrls: ['./dialog-utente.component.css'],
  standalone: false,
})
export class DialogUtenteComponent {
  cliente: any;
  idUtente: number = 0;
  idCliente: number = 0;
  email: string = '';
  roles: string = '';
  username: string = '';

  constructor(
    public dialogRef: MatDialogRef<DialogUtenteComponent>,
    private utenteService: UtenteService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.cliente = data.cliente;
    this.idUtente = this.cliente?.utente?.idUtente;
    this.idCliente = this.cliente?.idCliente;
    this.email = this.cliente?.utente?.email;
    this.roles = this.cliente?.utente?.roles;
    this.username = this.cliente?.utente?.username;
  }

  onChange(): void {
    console.log('Email modificata:', this.email);
  }

  onSaveUtente(): void {
    const updateData = {
      email: this.email,
      idUtente: this.idUtente,
      idCliente: this.idCliente,
      roles: this.roles,
      username: this.username,
    };

    this.utenteService.updateUtente(updateData).subscribe(
      (response) => {
        console.log('Utente aggiornato con successo:', response);
        this.dialogRef.close();
      },
      (error) => {
        console.error("Errore durante l'aggiornamento dell'utente:", error);
      }
    );
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
