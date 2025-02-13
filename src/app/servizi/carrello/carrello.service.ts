import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarrelloService {

  url = "http://localhost:9090/rest/carrello/"

  constructor() { }
}
