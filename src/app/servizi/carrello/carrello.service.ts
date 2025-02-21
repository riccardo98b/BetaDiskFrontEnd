import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CarrelloService {
  //url = 'http://localhost:9090/rest/carrello/';

  constructor(private http: HttpClient, private authService: AuthService) {}

  listaProdotti(id: number) {
    const url = this.authService.getURL('carrello/lista?id=' + id);

    return this.http.get(url);
  }

  addProdotto(body: {}) {
    const url = this.authService.getURL('carrello/add');

    return this.http.post(url, body);
  }

  removeProdotto(body: {}) {
    const url = this.authService.getURL('carrello/remove');

    return this.http.post(url, body);
  }

  svuotaCarrello(body: {}) {
    const url = this.authService.getURL('carrello/delete');
    return this.http.post(url, body);
  }
}
