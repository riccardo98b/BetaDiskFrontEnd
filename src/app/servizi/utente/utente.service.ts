import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utente } from '../../interfacce/Utente';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UtenteService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  updateUtente(body: {}): Observable<Utente> {
    const url = this.authService.getURL('utente/update');
    return this.http.post<Utente>(url, body);
  }

  createUtente(body: {}): Observable<Utente> {
    const url = this.authService.getURL('utente/create');
    return this.http.post<Utente>(url, body);
  }

  utentePerRuolo(roles: string): Observable<Utente> {
    const url = this.authService.getURL('utente/listAllRoles?roles=' + roles);
    return this.http.get<Utente>(url);
  }
}
