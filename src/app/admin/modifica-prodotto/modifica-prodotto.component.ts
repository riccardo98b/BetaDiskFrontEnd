import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProdottiService } from '../../servizi/prodotti/prodotti.service';
import { LoaderService } from '../../servizi/loader.service';
import { Prodotto } from '../../interfacce/Prodotto';

@Component({
  selector: 'app-modifica-prodotto',
  standalone: false,
  templateUrl: './modifica-prodotto.component.html',
  styleUrl: './modifica-prodotto.component.css',
})
export class ModificaProdottoComponent implements OnInit {
  cercaProdottoForm: FormGroup = this.cercaProdottoFormInit();
  prodottoForm: FormGroup = this.prodottoFormInit();
  idProdotto: number;
  response: any;
  prodottoTrovato: boolean;
  prodottoSelezionato: Prodotto;

  constructor(
    private service: ProdottiService,
    private loader: LoaderService
  ) {}
  ngOnInit(): void {
    this.cercaProdottoForm = this.cercaProdottoFormInit();
    
  }

  cercaProdotto() {
    this.loader.startLoader();
    this.getProdottoPerId();
  }

  modificaProdotto() {}

  getProdottoPerId() {
    this.service
      .prodottoPerId(this.cercaProdottoForm.value.idProdotto)
      .subscribe((resp) => {
        this.response = resp;
        this.prodottoSelezionato = this.response.dati[0];
        if (this.response.rc === true) {
          this.prodottoTrovato = true;
        } else {
          this.prodottoTrovato = false;
        }
        console.log('resp: ', resp);
        console.log('idProdotto: ', this.cercaProdottoForm.value);
        console.log(this.prodottoTrovato);
        console.log(this.prodottoSelezionato);
        this.prodottoFormInit();
        this.loader.stopLoader();
      });
  }

  cercaProdottoFormInit(): FormGroup {
    return new FormGroup({
      idProdotto: new FormControl(),
    });
  }

  modificaProdotto(): FormGroup{
    return new FormGroup({
      this.prodottoFormInit()
    })
  }

  formInit(): FormGroup {
    return new FormGroup({
      formato: new FormControl(''),
      titolo: new FormControl(''),
      artista: new FormControl(''),
      genere: new FormControl(''),
      descrizione: new FormControl(''),
      annoPubblicazione: new FormControl(''),
      prezzo: new FormControl(''),
      quantita: new FormControl(''),
      immagineProdotto: new FormControl(''),
    });
  }

  prodottoFormInit() {
    return this.prodottoForm.patchValue({
      formato: this.prodottoSelezionato.formato,
      titolo: this.prodottoSelezionato.titolo,
      artista: this.prodottoSelezionato.artista,
      genere: this.prodottoSelezionato.genere,
      descrizione: this.prodottoSelezionato.descrizione,
      annoPubblicazione: this.prodottoSelezionato.annoPubblicazione,
      prezzo: this.prodottoSelezionato.prezzo,
      quantita: this.prodottoSelezionato.quantita,
      immagineProdotto: this.prodottoSelezionato.immagineProdotto,
    });
  }
}
