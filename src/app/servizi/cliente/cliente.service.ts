import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  constructor(private http: HttpClient) {}

  url = 'http://localhost:9090/rest/cliente/';

  listAll() {
    return this.http.get(this.url + 'listAll');
  }

  getCliente(idCliente: number) {
    let param = new HttpParams().set('idCliente', idCliente.toString());
    return this.http.get(this.url + 'listById?id=' + idCliente);
  }
}
