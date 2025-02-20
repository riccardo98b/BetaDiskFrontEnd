import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription, tap } from 'rxjs';
import { SignIn } from '../interfacce/SignIn';
import { Router } from '@angular/router';
import { ConfigService } from '../servizi/config/config.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private config: ConfigService
  ) {}
  private signInUrl: string = 'http://localhost:9090/rest/utente/signin';
  private logoutSubject: Subject<void> = new Subject<void>();
  private subscriptions: Subscription[] = [];

  signInUtente(body: {
    username: string;
    password: string;
  }): Observable<SignIn> {
    return this.http.post<SignIn>(this.signInUrl, body).pipe(
      tap((response) => {
        console.log(response);

        if (response && response.logged) {
          console.log('Login effettuato con successo');
          this.setSessione(response);
          this.gestisciConfig();
          this.setRottaPerRuolo();
        } else {
          console.log('Credenziali non valide');
        }
      })
    );
  }

  private setRottaPerRuolo(): void {
    this.router;
    if (this.isAdmin()) {
      console.log('Ruolo: Amministratore');
      this.router.navigate(['/admin/dashboard']).then(() => {
        console.log('Navigazione completata verso /admin/dashboard');
      });
    } else if (this.isUtente() && this.getClienteIdSessione != null) {
      this.router.navigate(['/profilo']).then(() => {
        window.location.reload();
        console.log('Navigazione completata verso /');
      });
    } else if (this.isUtente()) {
      console.log('Ruolo: Utente');
      this.router.navigate(['/profilo']).then(() => {
        window.location.reload();
        console.log('Navigazione completata verso /');
      });
    } else {
      console.log('Credenziali non valide');
    }
  }

  private buildURL() {
    this.config.getConfig().subscribe((response: any) => {
      console.log('Risposta dal config:', response);
      if (response && response.domain && response.port) {
        let url = 'http://' + response.domain + ':' + response.port + '/rest/';
        console.log('URL costruito:', url);
        localStorage.setItem('config', url);
      } else {
        console.error('Config non valido:', response);
      }
    });
  }

  private gestisciConfig() {
    //   const valoreConfig = localStorage.getItem('config');
    const valoreConfig = localStorage.getItem('config');
    if (valoreConfig) {
      console.log('Config trovato nel localStorage:', valoreConfig);
    } else {
      console.log('Config non trovato');
      this.buildURL();
    }
  }
  getURL(component: string): string {
    const config = localStorage.getItem('config');
    console.log('Config URL:', config);
    if (!config) this.buildURL();
    const fullUrl = config ? config + component : '';
    console.log('URL completo:', fullUrl);
    return fullUrl;
  }

  private setSessione(response: SignIn): void {
    localStorage.setItem('idUtente', response.idUtente.toString());
    localStorage.setItem('idCliente', response.idCliente.toString());
    localStorage.setItem('ruoloUtente', response.role.toString());
    localStorage.setItem(
      'dataRegistrazione',
      response.dataRegistrazione.toString()
    );
  }
  getUtenteIdSessione(): number | null {
    return +localStorage.getItem('idUtente');
  }
  getClienteIdSessione(): number | null {
    return +localStorage.getItem('idCliente');
  }
  getRuoloUtente(): string | null {
    return localStorage.getItem('ruoloUtente');
  }
  logout(): void {
    // pulisco la session storage
    localStorage.clear();
    this.router.navigate(['/']);
    console.log('Logout effettuato con successo');
    this.logoutSubject.next();
    this.unsubscribeAll();
  }

  onLogout(): Observable<void> {
    return this.logoutSubject.asObservable();
  }

  private unsubscribeAll(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.subscriptions = [];
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('idUtente') !== null;
  }

  getUserRole(): string | null {
    return localStorage.getItem('ruoloUtente');
  }

  isAdmin(): boolean {
    //console.log('Ruolo utente:', this.getRuoloUtente());
    return this.getRuoloUtente() === 'ADMIN';
  }

  isUtente(): boolean {
    console.log('Ruolo utente:', this.getRuoloUtente());
    return this.getRuoloUtente() === 'UTENTE';
  }
}
