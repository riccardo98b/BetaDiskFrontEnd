import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../servizi/wishlist/wishlist.service';

interface Prodotto {
  immagineProdotto: string;
  titolo: string;
  descrizione: string;
  prezzo: number;
  formato: string;
  annoPubblicazione: number;
}

@Component({
  selector: 'app-wishlist',
  standalone: false,
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  wishlist: any[] = [];
  currentUserId: number = 1; // ID del cliente corrente (simulato per ora)

  constructor(private wishlistService: WishlistService) {}

  ngOnInit(): void {
    this.wishlistService.getWishlist().subscribe((data) => {
      // Filtra le wishlist per mostrare solo quella dell'utente corrente
      this.wishlist = data.filter(
        (item) => item.cliente.idCliente === this.currentUserId
      );
    });
  }

  addToWishlist(prodotto: Prodotto): void {
    console.log('Aggiunto alla wishlist', prodotto);
  }

  removeFromWishlist(prodotto: Prodotto): void {
    console.log('Rimosso dalla wishlist', prodotto);
    this.wishlist.forEach((item) => {
      item.prodotti = item.prodotti.filter((p: Prodotto) => p !== prodotto);
    });
  }

  clearAllFromWishlist(item: any): void {
    console.log('Tutti i prodotti rimossi dalla wishlist');
  }
}
