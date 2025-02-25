import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../../interfacce/Cliente';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  listAllClienti(
    nome?: string,
    cognome?: string,
    cap?: string,
    provincia?: string,
    comune?: string
  ): Observable<Cliente[]> {
    let params = new HttpParams();
    if (nome) {
      params = params.append('nome', nome);
    }
    if (cognome) {
      params = params.append('cognome', cognome);
    }
    if (cap) {
      params = params.append('cap', cap);
    }
    if (provincia) {
      params = params.append('provincia', provincia);
    }
    if (comune) {
      params = params.append('comune', comune);
    }
    const url = this.authService.getURL('cliente/listAll');
    return this.http.get<Cliente[]>(url, { params });
  }

  getCliente(idCliente: number): Observable<Cliente> {
    const url = this.authService.getURL('cliente/listById?id=') + idCliente;
    console.log('URL completo', url);
    return this.http.get<Cliente>(url);
  }

  updateCliente(body: {}): Observable<Cliente> {
    const url = this.authService.getURL('cliente/update');
    return this.http.post<Cliente>(url, body);
  }

  createCliente(body: {}): Observable<Cliente> {
    const url = this.authService.getURL('cliente/create');
    return this.http.post<Cliente>(url, body);
  }

  deleteCliente(body: {}): Observable<Cliente> {
    const url = this.authService.getURL('cliente/delete');
    return this.http.post<Cliente>(url, body);
  }
}
