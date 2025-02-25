import { Component } from '@angular/core';
import { ProfiloService } from '../../servizi/profilo/profilo.service';

@Component({
  selector: 'app-welcome-page',
  standalone: false,
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.css',
})
export class WelcomePageComponent {
  nomeClienteBenvenuto: string = '';

  constructor(private profiloService: ProfiloService) {}
}
