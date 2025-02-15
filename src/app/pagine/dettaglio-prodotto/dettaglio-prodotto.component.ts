import { Component, OnInit } from '@angular/core';
import { ProdottiService } from '../../servizi/prodotti/prodotti.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-dettaglio-prodotto',
  standalone: false,
  templateUrl: './dettaglio-prodotto.component.html',
  styleUrl: './dettaglio-prodotto.component.css',
})
export class DettaglioProdottoComponent implements OnInit {
  idProdotto: number;
  prodottoSelezionato: any;

  constructor(private service: ProdottiService, private route: ActivatedRoute) {
    this.idProdotto = +this.route.snapshot.paramMap.get('idProdotto')!;
  }

  ngOnInit(): void {
    this.getProdotto();
  }

  getProdotto() {
    this.service.prodottoPerId(this.idProdotto).subscribe((response: any) => {
      console.log(response);

      this.prodottoSelezionato = response.dati[0];
    });
  }
}
