import { Cliente } from './Cliente';

export interface Utente {
  idUtente: number;
  username: string;
  email: string;
  roles: string;
  cliente?: Cliente;
}
