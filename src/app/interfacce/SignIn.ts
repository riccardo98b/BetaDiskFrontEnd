export interface SignIn {
  username: string;
  logged: boolean;
  role: string;
  idUtente: number;
  idCliente: number;
  password: string;
  dataRegistrazione: Date;
}
