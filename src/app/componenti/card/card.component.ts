import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Prodotto } from '../../interfacce/Prodotto';
import { WishlistService } from '../../servizi/wishlist/wishlist.service';
import { Cliente } from '../../interfacce/Cliente';
import { ClienteService } from '../../servizi/cliente/cliente.service';

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

  currentUserId: number | null = localStorage.getItem('idCliente') ? +localStorage.getItem('idCliente') : null;
  currentCliente: Cliente | null = null;

  constructor(
    private wishlistService: WishlistService,
    private clienteService: ClienteService
  ) {}

  ngOnInit() {
    console.log('currentUserId:', this.currentUserId);
    if (this.currentUserId) {
      this.clienteService.getCliente(this.currentUserId).subscribe({
        next: (cliente) => {
          console.log('Cliente recuperato:', cliente);
          this.currentCliente = cliente;
        },
        error: (error) => {
          console.error('Errore nel recupero del cliente:', error);
        }
      });
    } else {
      console.error('Nessun utente loggato');
    }
  }

  preferitiWishlist(prodotto: Prodotto): void {
    if (!this.currentUserId || !this.currentCliente) {
      console.error("Errore: Nessun utente loggato o dati cliente non disponibili.");
      return;
    }

    if (this.isInWishlist) {
      // Se è nella wishlist, lo rimuove
      this.wishlistService.removeProductFromWishlist(this.currentUserId, prodotto.idProdotto).subscribe({
        next: () => {
          console.log('Prodotto rimosso dalla wishlist');
          this.toggleWishlist.emit(prodotto);
        },
        error: (error) => {
          console.error('Errore nella rimozione dalla wishlist:', error);
        }
      });
    } else {
      this.wishlistService.addProductToWishlist(this.currentUserId, [prodotto.idProdotto]).subscribe({
        next: () => {
          console.log('Prodotto aggiunto alla wishlist');
          this.toggleWishlist.emit(prodotto);
        },
        error: (error) => {
          console.error('Errore durante l\'aggiunta alla wishlist:', error);
        }
      });
    }
  }
}
