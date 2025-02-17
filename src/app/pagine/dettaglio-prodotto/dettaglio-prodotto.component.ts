import { Component, OnInit } from '@angular/core';
import { ProdottiService } from '../../servizi/prodotti/prodotti.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Prodotto } from '../../interfacce/Prodotto';
import { response } from 'express';

@Component({
  selector: 'app-dettaglio-prodotto',
  standalone: false,
  templateUrl: './dettaglio-prodotto.component.html',
  styleUrl: './dettaglio-prodotto.component.css',
})
export class DettaglioProdottoComponent implements OnInit {
  idProdotto: number;
  prodottoSelezionato: Prodotto;
  recensioni: [];
  isLoading: boolean;
  response: any;

  constructor(private service: ProdottiService, private route: ActivatedRoute) {
    this.idProdotto = +this.route.snapshot.paramMap.get('idProdotto')!;
  }

  ngOnInit(): void {
    this.getProdotto();
  }

  getProdotto() {
    this.isLoading = true;
    this.service.prodottoPerId(this.idProdotto).subscribe((resp) => {
      this.response = resp;
      if (this.response.rc === true) {
        this.prodottoSelezionato = this.response.dati[0];
        this.recensioni = this.response.dati[0].recensioni;
      } else {
      }
      this.isLoading = false;
    });
  }
}
