import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfiloService {
  private nomeCliente = new BehaviorSubject<string>('');
  nomeCliente$ = this.nomeCliente.asObservable();

  constructor() {}

  setNomeCliente(nomeCliente: string) {
    this.nomeCliente.next(nomeCliente);
  }
}
