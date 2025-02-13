import { Component, OnInit } from '@angular/core';
import { CarrelloService } from '../../servizi/carrello/carrello.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrello',
  standalone: false,
  templateUrl: './carrello.component.html',
  styleUrl: './carrello.component.css',

})
export class CarrelloComponent implements OnInit {

  prodotti: any;
  totale: number = 0;
  idCliente = 1;
  msg: string = "";
  rc:boolean = true;

  constructor(private serv: CarrelloService,
    private router : Router
  ) {}

  ngOnInit(): void {
   this.serv.listaProdotti(this.idCliente).subscribe((r : any) => {

    if (r.rc) {
      this.totale = r.dati.totale;
      this.prodotti = r.dati.prodotti;
    } else {
      this.rc = r.rc;
      this.msg = r.msg;
    }
   })
  }

  svuotaCarrello() {
    let request = {
      "idCliente" : this.idCliente
    };
    this.serv.svuotaCarrello(request).subscribe((r:any) => {
      this.msg = r.msg;
      this.rc = r.rc;
      this.router.navigate(["/carrello"]).then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 2000); 
      });
    })
  }
  
}
