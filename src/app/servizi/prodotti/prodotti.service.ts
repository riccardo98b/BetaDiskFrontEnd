import { HttpClient, HttpParams } from '@angular/common/http';
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

  prodottoPerId(idProdotto: number) {
    let param = new HttpParams().set('idProdotto', idProdotto.toString());
    return this.http.get(this.url + 'list?idProdotto=' + idProdotto);
  }
}
