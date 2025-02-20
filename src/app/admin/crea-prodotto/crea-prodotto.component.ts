import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProdottiService } from '../../servizi/prodotti/prodotti.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Prodotto } from '../../interfacce/Prodotto';

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
  isLoading: boolean = false;
  @Output() successo: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private service: ProdottiService) {}

  ngOnInit(): void {
    this.prodottoForm = this.formInit();
  }

  onSubmit() {
    this.isLoading = true;
    this.service.createProdotto(this.prodottoForm.value).subscribe((resp) => {
      this.isLoading = false;
      if (this.resp.rc === true) {
        this.successo.emit(true);
      } else {
        this.successo.emit(false);
      }
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

  openModale() {
    this.successo.emit(true);
  }

  closeModale() {
    this.successo.emit(false);
  }
}
