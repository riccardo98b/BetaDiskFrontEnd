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
  resp: any;

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

  getProdottoPerId() {
    this.service
      .prodottoPerId(this.cercaProdottoForm.value.idProdotto)
      .subscribe((resp) => {
        this.response = resp;
        this.prodottoSelezionato = this.response.dati[0];
        if (this.response.rc === true) {
          this.prodottoTrovato = true;

          this.prodottoForm.patchValue({
            idProdotto: this.prodottoSelezionato.idProdotto,
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
        } else {
          this.prodottoTrovato = false;
        }

        this.loader.stopLoader();
      });
  }

  modificaProdotto() {
    console.log('prodotto-modifica', this.prodottoForm.value);
    this.loader.startLoader();
    this.service.updateProdotto(this.prodottoForm.value).subscribe((resp) => {
      this.resp = resp;
      if (this.response.rc === true) {
        console.log('aggiornato con successo');
        console.log(resp);
      } else {
        console.log('male molto male...');
      }
      this.prodottoForm.reset();
      this.cercaProdottoForm.reset();
      this.loader.stopLoader();
    });
  }

  cercaProdottoFormInit(): FormGroup {
    return new FormGroup({
      idProdotto: new FormControl(),
    });
  }

  prodottoFormInit(): FormGroup {
    return new FormGroup({
      idProdotto: new FormControl(''),
      formato: new FormControl(this.prodottoSelezionato?.formato || ''),
      titolo: new FormControl(this.prodottoSelezionato?.titolo || ''),
      artista: new FormControl(this.prodottoSelezionato?.artista || ''),
      genere: new FormControl(this.prodottoSelezionato?.genere || ''),
      descrizione: new FormControl(this.prodottoSelezionato?.descrizione || ''),
      annoPubblicazione: new FormControl(
        this.prodottoSelezionato?.annoPubblicazione || ''
      ),
      prezzo: new FormControl(this.prodottoSelezionato?.prezzo || ''),
      quantita: new FormControl(this.prodottoSelezionato?.quantita || ''),
      immagineProdotto: new FormControl(
        this.prodottoSelezionato?.immagineProdotto || ''
      ),
    });
  }
}
