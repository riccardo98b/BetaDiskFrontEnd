import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Prodotto } from '../../interfacce/Prodotto';
import { WishlistService } from '../../servizi/wishlist/wishlist.service';  // Importa il tuo servizio per la wishlist

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
  @Output() addToWishlist = new EventEmitter<Prodotto>();
  @Output() removeFromWishlist = new EventEmitter<Prodotto>();

  // Ottieni l'ID dell'utente dal localStorage
  currentUserId: number | null = localStorage.getItem('idCliente') ? +localStorage.getItem('idCliente') : null;
  currentCliente: Cliente | null = null;  // Variabile per il cliente completo

  constructor(
    private wishlistService: WishlistService,
    private clienteService: ClienteService  // Aggiungi il servizio ClienteService
  ) {}

  ngOnInit() {
    console.log('currentUserId:', this.currentUserId);  // Aggiungi un log per vedere il valore dell'ID
    if (this.currentUserId) {
      this.clienteService.getCliente(this.currentUserId).subscribe({
        next: (cliente) => {
          console.log('Cliente recuperato:', cliente);  // Logga i dati del cliente
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



  handleWishlistClick(prodotto: Prodotto): void {
    console.log('Clicked on product:', prodotto);

    // Verifica se l'utente è loggato e se l'oggetto cliente è disponibile
    if (!this.currentUserId || !this.currentCliente) {
      console.error("Errore: Nessun utente loggato o dati cliente non disponibili.");
      return;
    }

    // Verifica che prodottiWishlist esista
    if (!prodotto.prodottiWishlist) {
      console.error('Prodotti wishlist non trovati per il prodotto:', prodotto);
      return;
    }

    // Verifica se il prodotto è già nella wishlist
    const isInWishlist = prodotto.prodottiWishlist.some(wishlist => wishlist.cliente?.idCliente === this.currentUserId);
    console.log('isInWishlist:', isInWishlist);

    if (isInWishlist) {
      // Se il prodotto è già nella wishlist, rimuovilo
      console.log('Il prodotto è già nella wishlist, lo rimuovo.');
      this.wishlistService.removeProductFromWishlist(this.currentUserId, prodotto.idProdotto).subscribe({
        next: (response) => {
          console.log('Prodotto rimosso dalla wishlist con successo:', response);
          this.removeFromWishlist.emit(prodotto); // Notifica al componente genitore
        },
        error: (error) => {
          console.error('Errore durante la rimozione dalla wishlist:', error);
        }
      });
    } else {
      // Altrimenti, aggiungi il prodotto alla wishlist
      console.log('Il prodotto non è nella wishlist, lo aggiungo.');
      this.wishlistService.addProductToWishlist(this.currentUserId, [prodotto.idProdotto]).subscribe({
        next: (response) => {
          console.log('Prodotto aggiunto alla wishlist con successo:', response);
          this.addToWishlist.emit(prodotto); // Notifica al componente genitore
        },
        error: (error) => {
          console.error('Errore durante l\'aggiunta alla wishlist:', error);
        }
      });
    }
  }


}
