import { Carrello } from './Carrello';
import { Ordine } from './Ordine';
import { Recensione } from './Recensione';
import { Utente } from './Utente';
import { Wishlist } from './Wishlist';

export interface Cliente {
  idCliente: number;
  nome: string;
  cognome: string;
  telefono: string;
  immagineCliente: string;
  via: string;
  cap: string;
  provincia: string;
  comune: string;
  dataRegistrazione: Date;
  ordini: Ordine[];
  carrello: Carrello;
  utente: Utente;
  wishlist: Wishlist;
  recensioni: Recensione[];
}
