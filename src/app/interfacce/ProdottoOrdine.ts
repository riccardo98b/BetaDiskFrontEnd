import { Ordine } from './Ordine';
import { Prodotto } from './Prodotto';

export interface ProdottoOrdine {
  id: number;
  ordine: Ordine;
  prodotto: Prodotto;
  quantita: number;
  prezzoAcquisto: number;
}
