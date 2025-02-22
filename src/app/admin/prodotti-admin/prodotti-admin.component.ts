import { Component, OnInit } from '@angular/core';
import { Prodotto } from '../../interfacce/Prodotto';
import { ProdottiService } from '../../servizi/prodotti/prodotti.service';
import { LoaderService } from '../../servizi/loader.service';

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
    private loader: LoaderService
  ) {}
  ngOnInit(): void {
    this.getTuttiProdotti();
  }

  getTuttiProdotti() {
    this.loader.startLoader();
    this.service.listAll().subscribe((resp) => {
      this.response = resp;
      if (this.response.rc === true) {
        this.data = this.response.dati;
      }
      this.loader.stopLoader();
    });
  }
}
