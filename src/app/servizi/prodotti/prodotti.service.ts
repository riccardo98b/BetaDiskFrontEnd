import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prodotto } from '../../interfacce/Prodotto';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProdottiService {
  // url = 'http://localhost:9090/rest/prodotto/';

  constructor(private http: HttpClient, private authService: AuthService) {}

  listAll(): Observable<Prodotto[]> {
    const url = this.authService.getURL('prodotto/list');
    return this.http.get<Prodotto[]>(url);
  }

  prodottoPerId(idProdotto: number): Observable<Prodotto> {
    const url = this.authService.getURL(
      'prodotto/list?idProdotto=' + idProdotto
    );
    return this.http.get<Prodotto>(url);
  }

  prodottoPerFormato(formato: string): Observable<Prodotto> {
    const url = this.authService.getURL(
      'prodotto/listFormato?formato=' + formato
    );
    return this.http.get<Prodotto>(url);
  }

  prodottoPerGenere(genere: string): Observable<Prodotto> {
    const url = this.authService.getURL('prodotto/list?genere=' + genere);
    return this.http.get<Prodotto>(url);
  }

  prodottoPerArtista(artista: string): Observable<Prodotto> {
    const url = this.authService.getURL('prodotto/list?artista=' + artista);
    return this.http.get<Prodotto>(url);
  }

  topTenProdotti(): Observable<Prodotto> {
    const url = this.authService.getURL('prodotto/topTenProdotti');
    return this.http.get<Prodotto>(url);
  }

  createProdotto(body: {}) {
    const url = this.authService.getURL('prodotto/create');
    return this.http.post(url, body);
  }

  updateProdotto(body: {}) {
    const url = this.authService.getURL('prodotto/update');
    return this.http.post(url, body);
  }

  listFormati(): Observable<any> {
    const url = this.authService.getURL('prodotto/formati');
    return this.http.get<any>(url);
  }

  deleteProdotto(body: {}): Observable<any> {
    const url = this.authService.getURL('prodotto/delete');
    return this.http.post<any>(url, body);
  }
}
