import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtenteService {
  constructor(private http: HttpClient) {}

  url = 'http://localhost:9090/rest/utente/';
  updateUtente(body: {}) {
    return this.http.post(this.url + 'update', body);
  }
}
