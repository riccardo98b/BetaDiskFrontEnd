import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utente } from '../../interfacce/Utente';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UtenteService {
  constructor(private http: HttpClient, private authService: AuthService) {}
  listAllUtenti(email?: string): Observable<Utente[]> {
    let params = new HttpParams();

    if (email) {
      params = params.append('email', email);
    }
    const url = this.authService.getURL('utente/listAll');
    return this.http.get<Utente[]>(url, { params });
  }
  updateUtente(body: {}): Observable<Utente> {
    const url = this.authService.getURL('utente/update');
    return this.http.post<Utente>(url, body);
  }
  getUtente(idCliente: number): Observable<Utente> {
    const url = this.authService.getURL('utente/listById?id=') + idCliente;
    console.log('URL completo', url);
    return this.http.get<Utente>(url);
  }

  createUtente(body: {}): Observable<Utente> {
    const url = this.authService.getURL('utente/create');
    return this.http.post<Utente>(url, body);
  }

  utentePerRuolo(roles: string): Observable<Utente> {
    const url = this.authService.getURL('utente/listAllRoles?roles=' + roles);
    return this.http.get<Utente>(url);
  }

  deleteUtente(body: {}): Observable<Utente> {
    const url = this.authService.getURL('utente/delete');
    return this.http.post<Utente>(url, body);
  }

  changePassword(
    idUtente: number,
    passwordCorrente: string,
    nuovaPassword: string
  ): Observable<any> {
    const url = this.authService.getURL('utente/changePassword');
    const body = {
      idUtente,
      passwordCorrente,
      nuovaPassword,
    };
    return this.http.post<Utente>(url, body);
  }

  verifyCurrentPassword(
    idUtente: number,
    passwordCorrente: string
  ): Observable<any> {
    const url = this.authService.getURL('utente/verifyCurrentPassword');
    const body = {
      idUtente,
      passwordCorrente,
    };
    return this.http.post<Utente>(url, body);
  }
}
