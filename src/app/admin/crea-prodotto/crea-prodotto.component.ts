import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProdottiService } from '../../servizi/prodotti/prodotti.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Prodotto } from '../../interfacce/Prodotto';
import { LoaderService } from '../../servizi/loader.service';

@Component({
  selector: 'app-crea-prodotto',
  standalone: false,
  templateUrl: './crea-prodotto.component.html',
  styleUrls: ['./crea-prodotto.component.css'],
})
export class CreaProdottoComponent implements OnInit {
  prodottoForm: FormGroup = this.formInit();
  resp: any;
  rc: boolean;
  listaFormati: string[] = [];
  data: Prodotto[];
  formati: any;

  constructor(
    private service: ProdottiService,
    private loader: LoaderService
  ) {}

  ngOnInit(): void {
    this.prodottoForm = this.formInit();
    this.listaDeiFormati();
  }

  onSubmit() {
    this.loader.startLoader();
    this.service.createProdotto(this.prodottoForm.value).subscribe((resp) => {
      this.resp = resp;
      if (this.resp.rc === true) {
        console.log(resp);
      }
      this.prodottoForm.reset();
      Object.keys(this.prodottoForm.controls).forEach((key) => {
        this.prodottoForm.controls[key].setErrors(null);
        this.prodottoForm.controls[key].markAsPristine();
        this.prodottoForm.controls[key].markAsUntouched();
      });
      this.loader.stopLoader();
    });
  }

  formInit(): FormGroup {
    return new FormGroup({
      formato: new FormControl('', [Validators.required]),
      titolo: new FormControl('', [Validators.required]),
      artista: new FormControl('', [Validators.required]),
      genere: new FormControl('', [Validators.required]),
      descrizione: new FormControl('', [Validators.required]),
      annoPubblicazione: new FormControl('', [Validators.required]),
      prezzo: new FormControl('', [Validators.required]),
      quantita: new FormControl('', [Validators.required]),
      immagineProdotto: new FormControl('', [Validators.required]),
    });
  }
  listaDeiFormati() {
    this.service.listFormati().subscribe((resp) => {
      this.resp = resp;
      this.formati = resp.dati;
      if (this.resp.rc === true) {
        console.log(this.resp);
      } else {
        console.log('errore');
      }
    });
  }
}
