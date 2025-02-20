import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class MailService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  confermaOrdine(body: {}) {
    const url = this.authService.getURL('mail/conferma-ordine');
    return this.http.post(url, body);
  }

  confermaRegistrazione(body: {}) {
    const url = this.authService.getURL('mail/conferma-registrazione');
    return this.http.post(url, body);
  }
}
