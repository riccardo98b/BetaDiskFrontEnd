import { ProdottoOrdine } from './ProdottoOrdine';

export interface Ordine {
  idOrdine: number;
  dataOrdine: string;
  totaleImporto: number;
  spedito: boolean;
  cliente: any;
  prodotti: ProdottoOrdine[];
}
