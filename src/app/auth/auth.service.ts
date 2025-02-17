import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { SignIn } from '../interfacce/SignIn';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}
  private signInUrl: string = 'http://localhost:9090/rest/utente/signin';

  signInUtente(body: {
    username: string;
    password: string;
  }): Observable<SignIn> {
    return this.http.post<SignIn>(this.signInUrl, body).pipe(
      tap((response) => {
        console.log(response);

        if (response && response.logged) {
          console.log('Login effettuato con successo');
        } else {
          console.log('Credenziali non valide');
        }
      })
    );
  }
  logout(): void {
    // pulisco la session storage
    sessionStorage.clear();
    this.router.navigate(['/']);
    console.log('Logout effettuato con successo');
  }

  isAuthenticated(): boolean {
    return sessionStorage.getItem('idUtente') !== null;
  }

  getUserRole(): string | null {
    return sessionStorage.getItem('ruoloUtente');
  }
}
