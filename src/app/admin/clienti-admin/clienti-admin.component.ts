import { Component, inject } from '@angular/core';
import { ClienteService } from '../../servizi/cliente/cliente.service';
import { Cliente } from '../../interfacce/Cliente';
import { MatDialog } from '@angular/material/dialog';
import { DialogStringaComponent } from '../../dialog/dialog-stringa/dialog-stringa.component';

@Component({
  selector: 'app-clienti-admin',
  standalone: false,
  templateUrl: './clienti-admin.component.html',
  styleUrls: ['./clienti-admin.component.css'],
})
export class ClientiAdminComponent {
  clienti: Cliente[] = [];
  dialog = inject(MatDialog);
  nomeSelezionato: string = '';
  tipoRicerca: string = 'nome';

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.caricaDatiClienti();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogStringaComponent, {
      minWidth: '500px',
      data: { nome: this.nomeSelezionato, tipoRicerca: this.tipoRicerca },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.nomeSelezionato = result;
      if (this.nomeSelezionato) {
        console.log(
          `Hai cercato un ${this.tipoRicerca}: ${this.nomeSelezionato}`
        );
        this.cercaClientiDopoCheck(this.nomeSelezionato, this.tipoRicerca);
      }
    });
  }

  cercaNome(): void {
    this.tipoRicerca = 'nome';
    this.openDialog();
  }

  cercaCognome(): void {
    this.tipoRicerca = 'cognome';
    this.openDialog();
  }

  cercaClientiDopoCheck(query: string, tipoRicerca: string): void {
    let nome = tipoRicerca === 'nome' ? query : '';
    let cognome = tipoRicerca === 'cognome' ? query : '';

    this.clienteService.listAll(nome, cognome).subscribe((response: any) => {
      console.log('Risposta della ricerca:', response);
      if (response.rc === true && response && response.dati) {
        this.clienti = response.dati;
        console.log(this.clienti);
      }
    });
  }

  caricaDatiClienti(): void {
    this.clienteService.listAll().subscribe(
      (response: any) => {
        console.log('Risposta dal server:', response);
        if (response.rc === true && response && response.dati) {
          this.clienti = response.dati;
        }
      },
      (errore) => {
        console.error('Errore nel caricamento dei clienti:', errore);
      }
    );
  }

  reset(): void {
    this.clienti = [];
    this.caricaDatiClienti();
  }
}
