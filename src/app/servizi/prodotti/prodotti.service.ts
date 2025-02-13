import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProdottiService {
  url = 'http://localhost:9090/rest/prodotto/';

  constructor(private http: HttpClient) {}

  listAll() {
    return this.http.get(this.url + 'list');
  }
}
