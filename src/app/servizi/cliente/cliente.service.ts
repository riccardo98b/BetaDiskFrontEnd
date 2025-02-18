import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../../interfacce/Cliente';

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
    //let param = new HttpParams().set('idCliente', idCliente.toString());
    return this.http.get(this.url + 'listById?id=' + idCliente);
  }

  updateCliente(body: {}): Observable<Cliente> {
    return this.http.post<Cliente>(this.url + 'update', body);
  }

  createCliente(body: {}): Observable<Cliente> {
    return this.http.post<Cliente>(this.url + 'create', body);
  }
}
