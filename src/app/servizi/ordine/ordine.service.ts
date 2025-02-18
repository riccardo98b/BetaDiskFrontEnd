import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdineService {

  url = "http://localhost:9090/rest/ordine/"
  
  constructor(private http: HttpClient ) { }

  inviaOrdine(body: {}){
    return this.http.post(this.url + "create", body)
  }

}
