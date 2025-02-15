import { Cliente } from './Cliente';
import { Prodotto } from './Prodotto';

export interface Wishlist {
  idWishlist: number;
  prodotti: Prodotto[];
  cliente: Cliente;
}
