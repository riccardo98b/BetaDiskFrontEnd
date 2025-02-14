import { Component, OnInit } from '@angular/core';
import { ProdottiService } from '../../servizi/prodotti/prodotti.service';
import { Router } from '@angular/router';
import { Prodotto } from '../../interfacce/Prodotto';

@Component({
  selector: 'app-prodotti',
  standalone: false,
  templateUrl: './prodotti.component.html',
  styleUrl: './prodotti.component.css',
})
export class ProdottiComponent implements OnInit {
  prodotto: Prodotto[];
  response: any;
  data: any;

  constructor(private service: ProdottiService, private route: Router) {}

  ngOnInit(): void {
    this.service.listAll().subscribe((resp) => {
      this.response = resp;
      this.data = this.response.dati;
      console.log(this.data);
    });
  }

  dettagliProdotto(idProdotto: any) {
    this.route.navigate(['/dettaglio-prodotto', idProdotto]);
  }
}
