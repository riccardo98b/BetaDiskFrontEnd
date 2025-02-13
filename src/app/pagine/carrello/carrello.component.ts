import { Component, OnInit } from '@angular/core';
import { CarrelloService } from '../../servizi/carrello/carrello.service';

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

  constructor(private serv: CarrelloService) {}

  ngOnInit(): void {
   this.serv.listaProdotti(this.idCliente).subscribe((r : any) => {
    this.totale = r.dati.totale;
    this.prodotti = r.dati.prodotti;
    console.log(this.prodotti);
   })
  }

  
}
