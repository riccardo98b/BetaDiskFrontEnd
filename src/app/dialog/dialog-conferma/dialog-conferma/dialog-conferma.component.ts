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
  titolo: string = 'Operazione';
  dialogRef = inject<MatDialogRef<DialogConfermaComponent>>(
    MatDialogRef<DialogConfermaComponent>
  );
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.messaggio = data.messaggio;
  }

  onConfirm(): void {
    console.log('Conferma');
    this.dialogRef.close(true);
  }

  onCancel(): void {
    console.log('Annulla');
    this.dialogRef.close(false);
  }
}
