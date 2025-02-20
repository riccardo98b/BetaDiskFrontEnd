import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class OrdineService {
  //url = 'http://localhost:9090/rest/ordine/';

  constructor(private http: HttpClient, private authService: AuthService) {}

  inviaOrdine(body: {}) {
    const url = this.authService.getURL('ordine/create');
    return this.http.post(url, body);
  }

  listaOrdini(id: number) {
    const url = this.authService.getURL('ordine/lista?id=' + id.toString());

    return this.http.get(url);
  }

  eliminaOrdine(body: {}) {
    const url = this.authService.getURL('ordine/delete');
    return this.http.post(url, body);
  }

  updateOrdine(body: {}) {
    const url = this.authService.getURL('ordine/update');
    return this.http.post(url, body);
  }

  listaOrdiniAdmin(data: string) {
    const url = this.authService.getURL('ordine/lista-admin?data=' + data);
    return this.http.get(url);
  }
}
