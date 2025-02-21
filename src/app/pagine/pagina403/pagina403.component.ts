import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-pagina403',
  standalone: false,
  templateUrl: './pagina403.component.html',
  styleUrl: './pagina403.component.css',
})
export class Pagina403Component implements OnInit {
  isLoggedIn: boolean = false;
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
  }
}
