import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-stringa',
  standalone: false,
  templateUrl: './dialog-stringa.component.html',
  styleUrl: './dialog-stringa.component.css',
})
export class DialogStringaComponent {
  stringa: string;
  stringaSelezionata: string = '';
  tipoRicerca: string = '';

  dialogRef = inject<MatDialogRef<DialogStringaComponent>>(
    MatDialogRef<DialogStringaComponent>
  );

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.tipoRicerca = data.tipoRicerca;
    this.stringa = data.nome;
  }
  onChange() {
    this.stringa = this.stringaSelezionata;
  }
}
