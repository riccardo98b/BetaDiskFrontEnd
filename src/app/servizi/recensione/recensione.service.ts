import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RecensioneService {
  //url = 'http://localhost:9090/rest/recensione/';

  constructor(private http: HttpClient, private authService: AuthService) {}

  listaRecensioniUtente(id: number) {
    const url = this.authService.getURL('recensione/lista-recensioni?id=' + id);
    return this.http.get(url);
  }

  addProdotto(body: {}) {
    const url = this.authService.getURL('carrello/add');

    return this.http.post(url, body);
  }

  eliminaRecensione(body: {}) {
    const url = this.authService.getURL('recensione/delete');
    return this.http.post(url, body);
  }

  creaRecensione(body: {}) {
    const url = this.authService.getURL('recensione/create');
    return this.http.post(url, body);
  }

  modificaRecensione(body: {}) {
    const url = this.authService.getURL('recensione/update');
    return this.http.post(url, body);
  }
}
