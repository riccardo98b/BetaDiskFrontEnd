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

  selectedDate: string = '';

  dialogRef = inject<MatDialogRef<DialogDataComponent>>(
    MatDialogRef<DialogDataComponent>,
  );
 // data = inject(MAT_DIALOG_DATA);

  data : string ;

  constructor() {
    //const data = this.data;

    //this.data = this.selectedDate;
    
  }
onChange(){
  this.data=this.selectedDate;
}

}
