import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-data',
  standalone: false,
  templateUrl: './dialog-data.component.html',
  styleUrl: './dialog-data.component.css'
})
export class DialogDataComponent {

  dialogRef = inject<MatDialogRef<DialogDataComponent>>(
    MatDialogRef<DialogDataComponent>,
  );
  data = inject(MAT_DIALOG_DATA);

  readonly date = new FormControl(new Date());

  constructor() {
    const data = this.data;

    this.date.setValue(data.selectedDate);
  }
}
