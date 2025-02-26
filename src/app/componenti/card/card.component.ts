import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Prodotto } from '../../interfacce/Prodotto';

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() prodotto: Prodotto;
  @Input() responsive: boolean;
  @Input() cartBadge: { [idProdotto: number]: number };
  @Input() isInWishlist: boolean;
  @Input() isWishlistPage: boolean = false;

  @Output() toggleWishlist = new EventEmitter<Prodotto>();

  constructor() {}

  preferitiWishlist(): void {
    this.toggleWishlist.emit(this.prodotto);
  }
}
