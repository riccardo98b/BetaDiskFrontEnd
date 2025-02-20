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

  listaOrdini(id: number) {
    return this.http.get(this.url + "lista?id=" + id)
  }

  eliminaOrdine(body: {}) {
    return this.http.post(this.url + "delete", body)
  }

  updateOrdine(body: {}) {
    return this.http.post(this.url + "update", body)
  }

  listaOrdiniAdmin(data: string) {
    return this.http.get(this.url + "lista-admin?data=" + data)
  }

}
