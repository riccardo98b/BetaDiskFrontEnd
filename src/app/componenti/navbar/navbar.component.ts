import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  showNavbar: boolean = false;
  utenteId: number = 0;
  logged: boolean = false;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.utenteId = +sessionStorage.getItem('idUtente')!;
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
}
