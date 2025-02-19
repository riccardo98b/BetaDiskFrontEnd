import { Component, Input, OnInit } from '@angular/core';
import { WishlistService } from '../../servizi/wishlist/wishlist.service';
import { Prodotto } from '../../interfacce/Prodotto';

@Component({
  selector: 'app-wishlist',
  standalone: false,
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  wishlist: Prodotto[] = [];  // Assicurati che sia sempre un array di Prodotto
  isLoading: boolean = true;
  currentUserId: number = 1;

  utente = {
    nome: 'Giovanni',
    cognome: 'Rossi'
  };

  @Input() prodotto: Prodotto;
  @Input() responsive: boolean;

  constructor(private wishlistService: WishlistService) {}

  ngOnInit(): void {
    this.wishlistService.getWishlist(this.currentUserId).subscribe({
      next: (data) => {
        console.log('Dati ricevuti dalla API:', data);  // Verifica i dati
        if (data && Array.isArray(data.dati)) {
          this.wishlist = data.dati.map(prodotto => {
            return {
              ...prodotto,
              prodottiCarrello: prodotto.prodottiCarrello || [], // Inizializza come array vuoto
              prodottiWishlist: prodotto.prodottiWishlist || []  // Inizializza come array vuoto
            };
          });
        } else {
          console.warn('La wishlist è vuota o non è stata caricata correttamente.');
          this.wishlist = [];  // Protezione in caso di array vuoto
        }
      },
      error: (error) => {
        console.error('Errore durante la richiesta di getWishlist:', error);
      },
      complete: () => {
        this.isLoading = false;
        console.log('Caricamento wishlist completato.');
      }
    });
  }

  addToCarrello(prodotto: Prodotto): void {
    console.log('Aggiunto al carrello', prodotto);
  }

  removeFromWishlist(prodotto: Prodotto): void {
    console.log('Rimuovo prodotto con idProdotto:', prodotto.idProdotto);
    this.wishlistService.removeProductFromWishlist(this.currentUserId, prodotto.idProdotto).subscribe({
        next: () => {
            this.wishlist = this.wishlist.filter(item => item.idProdotto !== prodotto.idProdotto);
            console.log('Prodotto rimosso dalla wishlist nel DB');
        },
        error: (error) => {
            console.error('Errore durante la rimozione del prodotto dalla wishlist:', error);
        }
    });
  }

  trackById(index: number, item: Prodotto): number {
    return item.idProdotto;
  }

  clearAllFromWishlist(): void {
    console.log('Svuoto la wishlist per idCliente:', this.currentUserId);
    this.wishlistService.clearAllWishlist(this.currentUserId).subscribe({
      next: (response) => {
        console.log('Risposta dal server:', response);
        this.wishlist = [];
        console.log('Tutti i prodotti sono stati rimossi dalla wishlist nel DB');
      },
      error: (error) => {
        console.error('Errore durante lo svuotamento della wishlist:', error);
      }
    });
  }
}
