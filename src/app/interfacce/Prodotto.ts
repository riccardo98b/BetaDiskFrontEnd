import { Ordine } from './Ordine';

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
  recensioni: [];
}
