import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  showNavbar: boolean = false;

  // Toggle navbar al click dell'icona
  toggleNavbar() {
    this.showNavbar = !this.showNavbar;
  }

  // Chiudi la navbar quando si clicca su un link
  closeNavbar() {
    this.showNavbar = false;
  }
}
