import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecensioneService {

 url = "http://localhost:9090/rest/recensione/"
   
   constructor(private http: HttpClient ) { }
 
   listaRecensioniUtente(id: number) {
     return this.http.get(this.url + "lista-recensioni?id=" + id)
   }
 
  //  eliminaOrdine(body: {}) {
  //    return this.http.post(this.url + "delete", body)
  //  }
}
