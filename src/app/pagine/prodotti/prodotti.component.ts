import { Component, OnInit } from '@angular/core';
import { ProdottiService } from '../../servizi/prodotti/prodotti.service';
import { Router } from '@angular/router';
import { Prodotto } from '../../interfacce/Prodotto';
import { log } from 'console';

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

  constructor(private service: ProdottiService, private route: Router) {}

  ngOnInit(): void {
    this.getTuttiProdotti();
  }

  getTuttiProdotti() {
    this.isLoading = true;
    this.service.listAll().subscribe((resp) => {
      this.response = resp;
      this.data = this.response.dati;
      if (this.response.rc === true) {
        this.isLoading = false;
        this.getFormati();
        this.getGeneri();
        this.getArtisti();
      }
    });
  }

  dettagliProdotto(idProdotto: any) {
    this.route.navigate(['/dettaglio-prodotto', idProdotto]);
  }

  // Logica dei Formati
  getFormati() {
    this.data?.forEach((p) => {
      this.listaFormati.push(p.formato);
    });

    this.listaFormati = [...new Set(this.listaFormati)];
  }

  prodottoPerFormato(formato: string) {
    this.isLoading = true;
    this.service.prodottoPerFormato(formato).subscribe((resp) => {
      this.response = resp;
      this.data = this.response.dati;
      this.response.rc === true ? (this.isLoading = false) : null;
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
    this.isLoading = true;
    this.service.prodottoPerGenere(genere).subscribe((resp) => {
      this.response = resp;
      this.data = this.response.dati;
      this.response.rc === true ? (this.isLoading = false) : null;
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
    this.isLoading = true;
    this.service.prodottoPerArtista(artista).subscribe((resp) => {
      this.response = resp;
      this.data = this.response.dati;
      this.response.rc === true ? (this.isLoading = false) : null;
    });
  }
}
