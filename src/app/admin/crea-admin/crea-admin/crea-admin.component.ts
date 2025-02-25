import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../../../dialog/pop-up/pop-up.component';
import { ProdottiService } from '../../../servizi/prodotti/prodotti.service';
import { LoaderService } from '../../../servizi/loader.service';
import { Prodotto } from '../../../interfacce/Prodotto';
@Component({
  selector: 'app-crea-admin',
  standalone: false,
  templateUrl: './crea-admin.component.html',
  styleUrl: './crea-admin.component.css',
})
export class CreaAdminComponent implements OnInit {
  prodottoForm: FormGroup = this.formInit();
  response: any;
  rc: boolean;
  listaFormati: string[] = [];
  data: Prodotto[];
  formati: any;
  mostra: any;

  constructor(
    private service: ProdottiService,
    private loader: LoaderService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.prodottoForm = this.formInit();
    this.listaDeiFormati();
  }

  onSubmit() {
    this.loader.startLoader();
    this.service.createProdotto(this.prodottoForm.value).subscribe((resp) => {
      this.response = resp;
      if (this.response.rc === true) {
        this.prodottoForm.reset();
        Object.keys(this.prodottoForm.controls).forEach((key) => {
          this.prodottoForm.controls[key].setErrors(null);
          this.prodottoForm.controls[key].markAsPristine();
          this.prodottoForm.controls[key].markAsUntouched();
        });
      } else {
        this.openDialog();
      }

      this.loader.stopLoader();
      this.openDialog();
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
      this.response = resp;
      this.formati = resp.dati;
    });
  }

  openDialog() {
    this.dialog.open(PopUpComponent, {
      width: '400px',
      data: { message: this.response.msg },
    });
  }
}
