import { Component, OnInit } from '@angular/core';
import { OrdineService } from '../../../servizi/ordine/ordine.service';
import { Router } from '@angular/router';
import { Ordine } from '../../../interfacce/Ordine';

@Component({
  selector: 'app-ordini',
  standalone: false,
  templateUrl: './ordini.component.html',
  styleUrl: './ordini.component.css'
})
export class OrdiniComponent implements OnInit{

  constructor(private serv: OrdineService, private router: Router){}
  idCliente = +localStorage.getItem('idCliente')!;
  msg: string = '';
  rc: boolean = true;
  isLoading: boolean;
    ordini: Ordine[];
    totale: number = 0;
    

  ngOnInit(): void {
    this.isLoading=true;
    this.serv.listaOrdini(this.idCliente).subscribe((r:any) => {
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
      this.router.navigate(['/profilo/ordini']).then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      });
    });
    this.isLoading=false;

  }
}
