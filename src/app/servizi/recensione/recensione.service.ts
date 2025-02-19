import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecensioneService {

 url = "http://localhost:9090/rest/recensione/"
   
   constructor(private http: HttpClient ) { }
 
   listaRecensioni(id: number) {
     return this.http.get(this.url + "listById?id=" + id)
   }
 
  //  eliminaOrdine(body: {}) {
  //    return this.http.post(this.url + "delete", body)
  //  }
}
