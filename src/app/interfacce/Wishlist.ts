import { Cliente } from './Cliente';
import { Prodotto } from './Prodotto';

export interface ApiResponse {
  rc: boolean;
  msg: string;
  dati: Prodotto[];
}

export interface Wishlist {
  idWishlist: number;
  prodotti: Prodotto[];
  cliente: Cliente;
}
