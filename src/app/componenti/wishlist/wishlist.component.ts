import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../servizi/wishlist/wishlist.service';

interface Prodotto {
  immagineProdotto: string;
  titolo: string;
  descrizione: string;
  prezzo: number;
  formato: string;
  annoPubblicazione: number;
  artista: string;  // Ensure artista is included here
}

interface ApiResponse {
  rc: boolean;
  msg: string;
  dati: Prodotto[]; // The "dati" field is an array of products
}

@Component({
  selector: 'app-wishlist',
  standalone: false,
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  wishlist: Prodotto[] = [];
  currentUserId: number = 1; // ID del cliente corrente (simulato per ora)

  constructor(private wishlistService: WishlistService) {}

  ngOnInit(): void {
    this.wishlistService.getWishlist(this.currentUserId).subscribe(
      (data: ApiResponse) => { // Expecting ApiResponse here
        console.log('Dati ricevuti dalla API:', data);
        this.wishlist = data.dati; // Assign the 'dati' array to the wishlist
      },
      (error) => {
        console.error('Errore durante la richiesta:', error);
      }
    );
  }

  // Aggiungi prodotto alla wishlist
  addToWishlist(prodotto: Prodotto): void {
    console.log('Aggiunto al carrello', prodotto);
  }

  // Rimuovi prodotto dalla wishlist
  removeFromWishlist(prodotto: Prodotto): void {
    console.log('Rimosso dalla wishlist', prodotto);
    this.wishlist = this.wishlist.filter(item => item !== prodotto);
  }

  // Svuota tutta la wishlist
  clearAllFromWishlist(): void {
    console.log('Tutti i prodotti rimossi dalla wishlist');
    this.wishlist = []; // Svuota la wishlist
  }
}
