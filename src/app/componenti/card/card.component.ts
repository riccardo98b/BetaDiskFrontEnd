import { Component, Input } from '@angular/core';
import { Prodotto } from '../../interfacce/Prodotto';

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() prodotto: Prodotto;
  @Input() responsive: boolean;
}
