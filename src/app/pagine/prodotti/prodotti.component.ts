import { Component, OnInit } from '@angular/core';
import { ProdottiService } from '../../servizi/prodotti/prodotti.service';
import { Router } from '@angular/router';
import { Prodotto } from '../../interfacce/Prodotto';
import { CarrelloService } from '../../servizi/carrello/carrello.service';

@Component({
  selector: 'app-prodotti',
  standalone: false,
  templateUrl: './prodotti.component.html',
  styleUrl: './prodotti.component.css',
})
export class ProdottiComponent implements OnInit {
  response: any;
  data: Prodotto[];
  listaFormati: string[] = [];
  listaGeneri: string[] = [];
  listaArtisti: string[] = [];
  isLoading: boolean;
  filtriPresenti: boolean = false;
  idCliente = +localStorage.getItem('idCliente')!;
  cartBadge: { [idProdotto: number]: number } = {};

  constructor(
    private service: ProdottiService,
    private route: Router,
    private serviceCarrello: CarrelloService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.getTuttiProdotti();
    this.serviceCarrello.listaProdotti(this.idCliente).subscribe((r: any) => {
      if (r.rc) {
        r.dati.prodotti.forEach((p:any) => {
          console.log(p)
          console.log(p.prodotto.idProdotto)
          this.cartBadge[p.prodotto.idProdotto]=p.prodotto?.prodottiCarrello[0]?.quantita})
      }
    });
    this.isLoading = false;
  }

  getTuttiProdotti() {
    this.service.listAll().subscribe((resp) => {
      this.response = resp;
      if (this.response.rc === true) {
        this.data = this.response.dati;
      }     
    });
  }

  dettagliProdotto(idProdotto: number) {
    this.route.navigate(['/dettaglio-prodotto', idProdotto]);
  }

  //Logica Filtri

  filtriMostrati() {
    this.filtriPresenti = true;
  }

  togliFiltri() {
    this.filtriPresenti = false;
    this.getTuttiProdotti();
  }

  // Logica dei Formati
  getFormati() {
    this.data?.forEach((p) => {
      this.listaFormati.push(p.formato);
    });

    this.listaFormati = [...new Set(this.listaFormati)];
  }

  prodottoPerFormato(formato: string) {
    this.filtriMostrati();
    this.isLoading = true;
    this.service.prodottoPerFormato(formato).subscribe((resp) => {
      this.response = resp;

      this.response.rc === true ? (this.data = this.response.dati) : null;
      this.isLoading = false;
    });
  }

  // Logica dei Generi
  getGeneri() {
    this.data?.forEach((p) => {
      this.listaGeneri.push(p.genere);
    });
    this.listaGeneri = [...new Set(this.listaGeneri)];
  }

  prodottoPerGenere(genere: string) {
    this.filtriMostrati();
    this.isLoading = true;
    this.service.prodottoPerGenere(genere).subscribe((resp) => {
      this.response = resp;

      this.response.rc === true ? (this.data = this.response.dati) : null;
      this.isLoading = false;
    });
  }

  // Logica degli artisti
  getArtisti() {
    this.data?.forEach((p) => {
      this.listaArtisti.push(p.artista);
    });
    this.listaArtisti = [...new Set(this.listaArtisti)];
  }

  prodottoPerArtista(artista: string) {
    this.filtriMostrati();
    this.isLoading = true;
    this.service.prodottoPerArtista(artista).subscribe((resp) => {
      this.response = resp;

      this.response.rc === true ? (this.data = this.response.dati) : null;
      this.isLoading = false;
    });
  }

  //Aggiungi prodotto al carrello
  aggiungiProdotto(idProdotto: number) {
    this.serviceCarrello
      .addProdotto({ idProdotto: idProdotto, idCliente: this.idCliente, quantita: 1 })
      .subscribe((resp) => {
        this.response = resp;
      });
  }
}
