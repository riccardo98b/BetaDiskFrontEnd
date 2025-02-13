import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarrelloService {

  url = "http://localhost:9090/rest/carrello/"

  constructor(private http: HttpClient ) { }

  listaProdotti(id: number) {
    return this.http.get(this.url + "lista?id=" + id)
  }
}
