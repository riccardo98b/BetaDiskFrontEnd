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
        console.log('Dati ricevuti dalla API:', data);
        if (data && Array.isArray(data.dati)) {
          this.wishlist = data.dati;
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

  addToWishlist(prodotto: Prodotto): void {
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
          console.error('Errore dettagliato:', error.message);
      }
  });
}

}
