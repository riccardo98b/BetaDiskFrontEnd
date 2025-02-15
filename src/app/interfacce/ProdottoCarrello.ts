import { Carrello } from './Carrello';
import { Prodotto } from './Prodotto';

export interface ProdottoCarrello {
  id: number;
  carrello: Carrello;
  prodotto: Prodotto;
  quantita: number;
}
