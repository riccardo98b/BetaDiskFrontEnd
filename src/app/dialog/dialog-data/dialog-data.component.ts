import { Component } from '@angular/core';

@Component({
  selector: 'app-dialog-data',
  standalone: false,
  templateUrl: './dialog-data.component.html',
  styleUrl: './dialog-data.component.css'
})
export class DialogDataComponent {

  // dialog = inject(MatDialog);

  // selectedDate = model<Date | null>(null);

  // openDialog() {
  //   const dialogRef = this.dialog.open(DatepickerDialogExampleDialog, {
  //     minWidth: '500px',
  //     data: {selectedDate: this.selectedDate()},
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     this.selectedDate.set(result);
  //   });
  // }
}
