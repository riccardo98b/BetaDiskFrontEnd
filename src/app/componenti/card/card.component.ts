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
  @Input() isWishlistPage: boolean = false;

  @Input() isInWishlist: boolean;
  @Output() toggleWishlist = new EventEmitter<Prodotto>();


  preferitiWishlist(): void {
    this.toggleWishlist.emit(this.prodotto);
  }
}
