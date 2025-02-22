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
  formati: any;

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
    this.listaDeiFormati();
  }

  getProdottoPerId() {
    this.service
      .prodottoPerId(this.cercaProdottoForm.value.idProdotto)
      .subscribe((resp) => {
        this.response = resp;
        if (this.response.rc === true) {
          this.prodottoSelezionato = this.response.dati[0];
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
      if (this.resp.rc === true) {
        console.log('aggiornato con successo');
      } else {
        console.log('male molto male...');
      }
      this.prodottoForm.reset();
      this.prodottoTrovato = false;

      this.cercaProdottoForm.reset();
      this.prodottoTrovato = false;
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
      idProdotto: new FormControl('', [Validators.required]),
      formato: new FormControl(this.prodottoSelezionato?.formato || '', [
        Validators.required,
      ]),
      titolo: new FormControl(this.prodottoSelezionato?.titolo || '', [
        Validators.required,
      ]),
      artista: new FormControl(this.prodottoSelezionato?.artista || '', [
        Validators.required,
      ]),
      genere: new FormControl(this.prodottoSelezionato?.genere || '', [
        Validators.required,
      ]),
      descrizione: new FormControl(
        this.prodottoSelezionato?.descrizione || '',
        [Validators.required]
      ),
      annoPubblicazione: new FormControl(
        this.prodottoSelezionato?.annoPubblicazione || '',
        [Validators.required]
      ),
      prezzo: new FormControl(this.prodottoSelezionato?.prezzo || '', [
        Validators.required,
      ]),
      quantita: new FormControl(this.prodottoSelezionato?.quantita || '', [
        Validators.required,
      ]),
      immagineProdotto: new FormControl(
        this.prodottoSelezionato?.immagineProdotto || '',
        [Validators.required]
      ),
    });
  }

  listaDeiFormati() {
    this.service.listFormati().subscribe((resp) => {
      this.response = resp;
      this.formati = resp.dati;
      if (this.response.rc === true) {
        console.log(this.response);
      } else {
        console.log('errore');
      }
    });
  }
}
