import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../servizi/wishlist/wishlist.service';

@Component({
  selector: 'app-wishlist',
  standalone: false,
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  wishlist: any[] = [];
  currentUserId: number = 1;  // ID del cliente corrente (simulato per ora)

  constructor(private wishlistService: WishlistService) {}

  ngOnInit(): void {
    this.wishlistService.getWishlist().subscribe(data => {
      // Filtra le wishlist per mostrare solo quella dell'utente corrente
      this.wishlist = data.filter(item => item.cliente.idCliente === this.currentUserId);
    });
  }
}
