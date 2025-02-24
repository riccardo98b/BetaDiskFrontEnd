import { Ordine } from './Ordine';
import { ProdottoCarrello } from './ProdottoCarrello';
import { Recensione } from './Recensione';
import { Wishlist } from './Wishlist';

export interface Prodotto {
  idProdotto: number;
  formato: string;
  titolo: string;
  artista: string;
  genere: string;
  descrizione: string;
  annoPubblicazione: number;
  prezzo: number;
  quantita: number;
  immagineProdotto: string;
  ordini: Ordine[];
  recensioni: Recensione[];
  prodottiCarrello: ProdottoCarrello[];
  prodottiWishlist: Wishlist[];
  isInWishlist?: boolean;
}
