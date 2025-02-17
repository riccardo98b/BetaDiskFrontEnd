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
  currentUserId: number = 1;
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
        console.error('Errore durante la richiesta:', error);
      },
      complete: () => {
        this.isLoading = false;
        console.log('Caricamento wishlist completato.');
      }
    });
  }

  addToWishlist(prodotto: Prodotto): void {
    console.log('Aggiunto al carrello', prodotto);
    // Logica per aggiungere al carrello
  }

  removeFromWishlist(prodotto: Prodotto): void {
    console.log('Rimosso dalla wishlist', prodotto);
    this.wishlist = this.wishlist.filter(item => item.idProdotto !== prodotto.idProdotto);
  }

  clearAllFromWishlist(): void {
    console.log('Tutti i prodotti rimossi dalla wishlist');
    this.wishlist = [];
  }
}
