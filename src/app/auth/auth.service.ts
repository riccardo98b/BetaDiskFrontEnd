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
          this.setSessione(response);
          this.gestisciConfig();
          this.setRottaPerRuolo();
        } else {
          //console.log('Credenziali non valide');
        }
      })
    );
  }

  isLoggedOut(): boolean {
    return !this.isAuthenticated();
  }

  private setRottaPerRuolo(): void {
    this.router;
    if (this.isAdmin()) {
      this.router.navigate(['/admin/dashboard']).then(() => {
        window.location.reload();
      });
    } else if (this.isUtente() && this.getClienteIdSessione != null) {
      this.router.navigate(['/profilo']).then(() => {
        window.location.reload();
      });
    } else if (this.isUtente()) {
      console.log('Ruolo: Utente');
      this.router.navigate(['/profilo']).then(() => {
        window.location.reload();
      });
    } else {
      //console.log('Credenziali non valide');
    }
  }

  private buildURL() {
    this.config.getConfig().subscribe((response: any) => {
      if (response && response.domain && response.port) {
        let url = 'http://' + response.domain + ':' + response.port + '/rest/';
        localStorage.setItem('config', url);
      } else {
        //console.error('Config non valido:', response);
      }
    });
  }

  private gestisciConfig() {
    const valoreConfig = localStorage.getItem('config');
    if (valoreConfig) {
      // console.log('Config trovato nel localStorage:', valoreConfig);
    } else {
      //console.log('Config non trovato');
      this.buildURL();
    }
  }
  getURL(component: string): string {
    const config = localStorage.getItem('config');
    if (!config) this.buildURL();
    const fullUrl = config ? config + component : '';
    return fullUrl;
  }

  private setSessione(response: SignIn): void {
    localStorage.setItem(
      'idUtente',
      response.idUtente ? response.idUtente.toString() : ''
    );
    localStorage.setItem(
      'idCliente',
      response.idCliente ? response.idCliente.toString() : ''
    );
    localStorage.setItem(
      'ruoloUtente',
      response.role ? response.role.toString() : ''
    );
    localStorage.setItem(
      'dataRegistrazione',
      response.dataRegistrazione ? response.dataRegistrazione.toString() : ''
    );
    localStorage.setItem(
      'username',
      response.username ? response.username.toString() : ''
    );
    localStorage.setItem(
      'email',
      response.email ? response.email.toString() : ''
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

  getUsername(): string | null {
    return localStorage.getItem('username');
  }
  logout(): void {
    // pulisco la session storage
    localStorage.clear();
    this.router.navigate(['/']);
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
    return this.getRuoloUtente() === 'ADMIN';
  }

  isAdminNotCliente(): boolean {
    return this.getRuoloUtente() === 'ADMIN' && !this.getClienteIdSessione();
  }

  isNotCliente(): boolean {
    return !this.getClienteIdSessione();
  }

  isUtente(): boolean {
    return this.getRuoloUtente() === 'UTENTE';
  }
}
