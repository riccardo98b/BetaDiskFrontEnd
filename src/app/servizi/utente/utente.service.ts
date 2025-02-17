import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utente } from '../../interfacce/Utente';

@Injectable({
  providedIn: 'root',
})
export class UtenteService {
  constructor(private http: HttpClient) {}

  url = 'http://localhost:9090/rest/utente/';
  updateUtente(body: {}): Observable<Utente> {
    return this.http.post<Utente>(this.url + 'update', body);
  }
}
