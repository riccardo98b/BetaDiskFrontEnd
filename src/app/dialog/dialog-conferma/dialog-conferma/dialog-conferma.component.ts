import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-conferma',
  standalone: false,
  templateUrl: './dialog-conferma.component.html',
  styleUrl: './dialog-conferma.component.css',
})
export class DialogConfermaComponent {
  messaggio: string = '';
  dialogRef = inject<MatDialogRef<DialogConfermaComponent>>(
    MatDialogRef<DialogConfermaComponent>
  );
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.messaggio = data.messaggio;
  }
}
