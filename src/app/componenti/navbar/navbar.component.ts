import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ProfiloService } from '../../servizi/profilo/profilo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  showNavbar: boolean = false;
  utenteId: number = 0;
  clienteId: number = 0;
  logged: boolean = false;
  role: string = '';
  nomeClienteBenvenuto: string = '';
  constructor(
    private authService: AuthService,
    private profiloService: ProfiloService //
  ) {
    this.profiloService.nomeCliente$.subscribe((nome) => {
      this.nomeClienteBenvenuto = nome;
    });
  }

  ngOnInit(): void {
    this.utenteId = this.authService.getUtenteIdSessione();
    this.clienteId = this.authService.getClienteIdSessione();
    this.role = this.authService.getRuoloUtente();
  }
  // Toggle navbar al click dell'icona
  toggleNavbar() {
    this.showNavbar = !this.showNavbar;
  }

  displayLoginElement(): void {
    this.logged = this.authService.isAuthenticated();
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
    this.logged = false;
  }

  // Chiudi la navbar quando si clicca su un link
  closeNavbar() {
    this.showNavbar = false;
  }
  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  isRoleValidAndIdClienteValidi(): boolean {
    return (
      (this.role === 'ADMIN' || this.role === 'UTENTE') && this.clienteId !== 0
    );
  }
}
