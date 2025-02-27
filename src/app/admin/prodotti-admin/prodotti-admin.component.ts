import { Component, OnInit } from '@angular/core';
import { Prodotto } from '../../interfacce/Prodotto';
import { ProdottiService } from '../../servizi/prodotti/prodotti.service';
import { LoaderService } from '../../servizi/loader.service';
import { Router } from '@angular/router';
import { PopUpComponent } from '../../dialog/pop-up/pop-up.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-prodotti-admin',
  standalone: false,
  templateUrl: './prodotti-admin.component.html',
  styleUrl: './prodotti-admin.component.css',
})
export class ProdottiAdminComponent implements OnInit {
  response: any;
  data: Prodotto[];
  isLoading: boolean;

  constructor(
    private service: ProdottiService,
    private loader: LoaderService,
    private route: Router,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.getTuttiProdotti();
  }

  getTuttiProdotti() {
    this.loader.startLoader();
    this.service.listAll().subscribe({
     next: (resp) => {
      this.response = resp;
      if (this.response.rc === true) {
        this.data = this.response.dati;
      } else {
        this.openDialog();
      }
      this.loader.stopLoader();
    }, error: (err) => {
      this,this.route.navigate(['/error500']);
    }
  });
  }

  deleteProdotto(idProdotto: number) {
    this.loader.startLoader();
    let req = {
      idProdotto: idProdotto,
    };
    this.service.deleteProdotto(req).subscribe((resp) => {
      this.response = resp;
      if (this.response.rc === true) {
        this.openDialog();
      } else {
        this.loader.stopLoader();
        this.openDialog();
      }

      this.loader.stopLoader();
      this.getTuttiProdotti();
    });
  }
  navigateToModificaProdotto(id: number) {
    this.route.navigate([
      'admin/dashboard/modifica-prodotto',
      { idProdotto: id },
    ]);
  }

  openDialog() {
    this.dialog.open(PopUpComponent, {
      width: '400px',
      data: { message: this.response.msg },
    });
  }
}
