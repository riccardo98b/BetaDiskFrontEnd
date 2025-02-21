import { Component, inject, model } from '@angular/core';
import { OrdineService } from '../../servizi/ordine/ordine.service';
import { Router } from '@angular/router';
import { Ordine } from '../../interfacce/Ordine';
import { MailService } from '../../servizi/mail/mail.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogDataComponent } from '../../dialog/dialog-data/dialog-data.component';

@Component({
  selector: 'app-ordini-admin',
  standalone: false,
  templateUrl: './ordini-admin.component.html',
  styleUrl: './ordini-admin.component.css'
})
export class OrdiniAdminComponent {

  constructor(private serv: OrdineService,
    private router: Router,
    private mailServ: MailService,
  ){}
    msg: string = '';
    rc: boolean = true;
    isLoading: boolean;
      ordini: Ordine[];
      totale: number = 0;
    mostra=false;
      
  
    elenco(data : string): void {
      this.isLoading=true;
      this.serv.listaOrdiniAdmin(data).subscribe((r:any) => {
        if (r.rc) {
          this.ordini = r.dati;
          this.mostra=true;
        } else {
          this.ordini = [];
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

    spedisciOrdine(id:number, index: number) {
      this.isLoading=true;
      let request = {
        idOrdine : id,
        spedito: true
      }
      console.log(new Date(this.ordini[index].dataOrdine).toLocaleDateString("it-IT"))
      this.serv.updateOrdine(request).subscribe((r:any) => {
        this.msg = r.msg;
        this.rc = r.rc;
        if (r.rc) {
          let mailRequest = {
            nome: this.ordini[index].cliente.nome,
            cognome : this.ordini[index].cliente.cognome,
            toEmail : this.ordini[index].cliente.utente.email,
            dataOrdine: new Date(this.ordini[index].dataOrdine).toLocaleDateString("it-IT")
          }
          this.mailServ.ordineSpedito(mailRequest).subscribe();
        }
        this.router.navigate(['/admin/dashboard/ordini']).then(() => {
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        });
      });
      this.isLoading=false;
  
    }

    dialog = inject(MatDialog);

    selectedDate:string = '';
  
    openDialog() {
      this.mostra=false;
      const dialogRef = this.dialog.open(DialogDataComponent, {
        minWidth: '500px',
        data: {selectedDate: this.selectedDate},
      });
  
      dialogRef.afterClosed().subscribe(result => {
        this.selectedDate= result;
        this.mostra=true;
        if (this.selectedDate){
          this.elenco(this.selectedDate);
        }
      });
      
    }

}
