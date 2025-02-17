import { Cliente } from './Cliente';
import { Prodotto } from './Prodotto';
import { ProdottoCarrello } from './ProdottoCarrello';

export interface Carrello {
  idCarrello: number;
  totale: number;
  prodotti: ProdottoCarrello[];
  cliente: Cliente;
}
