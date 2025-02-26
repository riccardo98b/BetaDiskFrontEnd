import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ProfiloService } from '../../servizi/profilo/profilo.service';
import { Router } from '@angular/router';
import { CarrelloService } from '../../servizi/carrello/carrello.service';

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
  adminUsername: string = '';
  adminIsNotCliente: boolean = false;

  constructor(
    private authService: AuthService,
    private profiloService: ProfiloService, //,
    private router: Router,
    private serviceCarrello: CarrelloService
  ) {
    this.profiloService.nomeCliente$.subscribe((nome) => {
      this.nomeClienteBenvenuto = nome;
    });
  }

  ngOnInit(): void {
    this.utenteId = this.authService.getUtenteIdSessione();
    this.clienteId = this.authService.getClienteIdSessione();
    this.role = this.authService.getRuoloUtente();
    this.getProdottiCarrello(this.clienteId);
    this.adminUsername = this.authService.getUsername();
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
    this.router.navigate(['/']).then(() => {
      window.location.reload();
      console.log('Navigazione completata verso /');
    });
    this.logged = false;
  }

  // Chiudi la navbar quando si clicca su un link
  closeNavbar() {
    this.showNavbar = false;
  }
  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  isAdminNotCliente(): boolean {
    this.adminIsNotCliente = this.authService.isAdminNotCliente();
    return this.adminIsNotCliente;
  }

  isRoleValidAndIdClienteValidi(): boolean {
    return (
      (this.role === 'ADMIN' || this.role === 'UTENTE') && this.clienteId !== 0
    );
  }

  totalItem = 0;
  getProdottiCarrello(clienteId: number) {
    this.serviceCarrello.listaProdotti(clienteId).subscribe((r: any) => {
      if (r.rc) {
        r.dati.prodotti.forEach((p: any) => {
          p.prodotto.prodottiCarrello.forEach((pc: any) => {
            if (p.id == pc.id) {
              this.totalItem += pc.quantita;
            }
          });
        });
      }
    });
  }
}
