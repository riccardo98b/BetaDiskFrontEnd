import { Component, OnInit } from '@angular/core';
import { ProdottiService } from '../../servizi/prodotti/prodotti.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Prodotto } from '../../interfacce/Prodotto';
import { response } from 'express';
import { CarrelloService } from '../../servizi/carrello/carrello.service';
import { FormBuilder, FormGroup } from '@angular/forms';

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
  qnt: number;
  idCliente = +sessionStorage.getItem('idCliente')!;
  qntForm: FormGroup;

  constructor(private service: ProdottiService, private route: ActivatedRoute,
    private serv: CarrelloService,
    private formBuilder: FormBuilder
  ) {
    this.idProdotto = +this.route.snapshot.paramMap.get('idProdotto')!;
  }

  ngOnInit(): void {
    this.getProdotto();
    this.qntForm =this.formBuilder.group({
         qnt: 0
        });
  }

  getProdotto() {
    this.isLoading = true;
    this.service.prodottoPerId(this.idProdotto).subscribe((resp) => {
      this.response = resp;
      if (this.response.rc === true) {
        this.prodottoSelezionato = this.response.dati[0];
        this.recensioni = this.response.dati[0].recensioni;
        this.qnt = this.prodottoSelezionato.quantita;
      } else {
      }
      this.isLoading = false;
    });
  }

  aggiungiProdotto() {
    if (this.qntForm.value.qnt > 0){
      let request = {
        idCliente : this.idCliente,
        idProdotto : this.idProdotto,
        quantita: this.qntForm.value.qnt
      }
    
      this.serv.addProdotto(request).subscribe((r:any) => {
        // this.msg = r.msg;
        // this.rc = r.rc;
        // this.router.navigate(['/carrello']).then(() => {
        //   setTimeout(() => {
        //     window.location.reload();
        //   }, 1500);
        // });
      })
   }
  }
}
