import { Component, inject, model } from '@angular/core';
import { OrdineService } from '../../servizi/ordine/ordine.service';
import { Router } from '@angular/router';
import { Ordine } from '../../interfacce/Ordine';
import { MatDialog } from '@angular/material/dialog';
import { DialogDataComponent } from '../../dialog/dialog-data/dialog-data.component';


@Component({
  selector: 'app-ordini-admin',
  standalone: false,
  templateUrl: './ordini-admin.component.html',
  styleUrl: './ordini-admin.component.css',
})
export class OrdiniAdminComponent {

  constructor(private serv: OrdineService, private router: Router){}
    data = "";
    msg: string = '';
    rc: boolean = true;
    isLoading: boolean;
      ordini: Ordine[];
      totale: number = 0;
      
  
    ngOnInit(): void {
      this.isLoading=true;
      this.serv.listaOrdiniAdmin(this.data).subscribe((r:any) => {
        if (r.rc) {
          this.ordini = r.dati;
        } else {
          this.rc = r.rc;
          this.msg = r.msg;
        }
      });
      this.isLoading=false;
    }
  
    eliminaOrdine(id:number) {
      this.isLoading=true;
      let request = {
        idOrdine : id
      }
      this.serv.eliminaOrdine(request).subscribe((r:any) => {
        this.msg = r.msg;
        this.rc = r.rc;
        this.router.navigate(['/admin/dashboard/ordini']).then(() => {
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        });
      });
      this.isLoading=false;
  
    }

    spedisciOrdine(id:number) {
      this.isLoading=true;
      let request = {
        idOrdine : id,
        spedito: true
      }
      this.serv.updateOrdine(request).subscribe((r:any) => {
        this.msg = r.msg;
        this.rc = r.rc;
        this.router.navigate(['/admin/dashboard/ordini']).then(() => {
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        });
      });
      this.isLoading=false;
  
    }

  dialog = inject(MatDialog);

  selectedDate = model<Date | null>(null);

  openDialog() {
    const dialogRef = this.dialog.open(DialogDataComponent, {
      minWidth: '500px',
      data: {selectedDate: this.selectedDate()},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.selectedDate.set(result);
    });
  }
}
