import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-pagina-carrello-vuoto',
  standalone: false,
  templateUrl: './pagina-carrello-vuoto.component.html',
  styleUrl: './pagina-carrello-vuoto.component.css'
})
export class PaginaCarrelloVuotoComponent {
  isLoggedIn: boolean = false;

    constructor(private authService: AuthService) {}
  
    ngOnInit(): void {
      this.isLoggedIn = this.authService.isAuthenticated();
    }
}
