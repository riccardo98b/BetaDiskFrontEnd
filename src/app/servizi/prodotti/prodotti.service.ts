import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prodotto } from '../../interfacce/Prodotto';

@Injectable({
  providedIn: 'root',
})
export class ProdottiService {
  url = 'http://localhost:9090/rest/prodotto/';

  constructor(private http: HttpClient) {}

  listAll(): Observable<Prodotto[]> {
    return this.http.get<Prodotto[]>(this.url + 'list');
  }

  prodottoPerId(idProdotto: number): Observable<Prodotto> {
    return this.http.get<Prodotto>(this.url + 'list?idProdotto=' + idProdotto);
  }

  prodottoPerFormato(formato: string): Observable<Prodotto> {
    return this.http.get<Prodotto>(this.url + 'listFormato?formato=' + formato);
  }

  prodottoPerGenere(genere: string): Observable<Prodotto> {
    return this.http.get<Prodotto>(this.url + 'list?genere=' + genere);
  }

  prodottoPerArtista(artista: string): Observable<Prodotto> {
    return this.http.get<Prodotto>(this.url + 'list?artista=' + artista);
  }

  topTenProdotti(): Observable<Prodotto> {
    return this.http.get<Prodotto>(this.url + 'topTenProdotti');
  }

  createProdotto(body: {}) {
    return this.http.post(this.url + 'create', body);
  }
}
