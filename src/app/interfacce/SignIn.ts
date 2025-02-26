export interface SignIn {
  username: string;
  logged: boolean;
  role: string;
  idUtente: number;
  idCliente: number | null;
  password: string;
  dataRegistrazione: Date | null;
}
