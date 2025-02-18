import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MailService {

    url = "http://localhost:9090/rest/mail/"
    
    constructor(private http: HttpClient ) { }

    confermaOrdine(body: {}){
      return this.http.post(this.url + "conferma", body)
    }
}
