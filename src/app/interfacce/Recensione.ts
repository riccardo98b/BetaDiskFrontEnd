import { Cliente } from './Cliente';
import { Prodotto } from './Prodotto';

export interface Recensione {
  idRecensione: number;
  descrizione: string;
  stelle: number;
  dataCreazione: Date;
  cliente: Cliente;
  prodotto: Prodotto;
}
