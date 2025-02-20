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
  wishlist: Prodotto[] = [];
  isLoading: boolean = true;
  currentUserId: number = 2;
  wishlistNonEsiste: boolean = false;

  @Input() prodotto: Prodotto;
  @Input() responsive: boolean;
  cartBadge: { [idProdotto: number]: number } = {};

  constructor(private wishlistService: WishlistService) {}

  ngOnInit(): void {
    this.inizializzaWishlist();
    this.wishlistService.getWishlist(this.currentUserId).subscribe({
      next: (data) => {
        console.log('Dati ricevuti dalla API:', data);
        if (data && Array.isArray(data.dati)) {
          this.wishlist = data.dati.map(prodotto => {
            return {
              ...prodotto,
              prodottiCarrello: prodotto.prodottiCarrello || [],
              prodottiWishlist: prodotto.prodottiWishlist || []
            };
          });
        } else {
          console.warn('La wishlist è vuota o non è stata caricata correttamente.');
          this.wishlist = [];
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

  createWishlist(): void {
    this.wishlistService.createWishlist(this.currentUserId).subscribe({
      next: (response) => {
        console.log("Wishlist creata con successo:", response);
        this.wishlist = []; // La wishlist è vuota inizialmente
      },
      error: (error) => {
        console.error("Errore durante la creazione della wishlist:", error);
      }
    });
  }


  inizializzaWishlist(): void {
    // Recupero l'ID utente dal localStorage
    const storedUserId = localStorage.getItem('idCliente');

    if (storedUserId) {
      this.currentUserId = +storedUserId;
      this.checkOrCreateWishlist();
    } else {
      console.error("Nessun utente loggato trovato.");
      this.isLoading = false;
    }
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

  checkOrCreateWishlist(): void {
    this.wishlistService.getWishlist(this.currentUserId).subscribe({
      next: (data) => {
        if (data && Array.isArray(data.dati) && data.dati.length > 0) {
          this.wishlist = data.dati;
          this.wishlistNonEsiste = false;
        } else {
          console.log("Wishlist non trovata.");
          this.wishlistNonEsiste = true;
        }
      },
      error: (error) => {
        console.error("Errore nel recupero della wishlist:", error);
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
