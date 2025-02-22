import { Component, inject } from '@angular/core';
import { ClienteService } from '../../servizi/cliente/cliente.service';
import { Cliente } from '../../interfacce/Cliente';
import { MatDialog } from '@angular/material/dialog';
import { DialogDataComponent } from '../../dialog/dialog-data/dialog-data.component';

@Component({
  selector: 'app-clienti-admin',
  standalone: false,
  templateUrl: './clienti-admin.component.html',
  styleUrl: './clienti-admin.component.css',
})
export class ClientiAdminComponent {
  showOrHideClienti: boolean = true;
  mostra: boolean = false;
  clienti: Cliente[] = [];
  response: any;
  dialog = inject(MatDialog);
  nome: string = '';

  showOrHideTabellaClienti(): boolean {
    this.showOrHideClienti = !this.showOrHideClienti;
    return this.showOrHideClienti;
  }
  openDialog() {
    this.mostra = false;
    const dialogRef = this.dialog.open(DialogDataComponent, {
      minWidth: '500px',
      data: { nome: this.nome },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.nome = result;
      this.mostra = true;
      if (this.nome) {
        console.log('ciao ' + this.nome);
      }
    });
  }

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.caricaDatiClienti();
  }
  caricaDatiClienti(): void {
    this.clienteService.listAll().subscribe(
      (response: any) => {
        console.log('risposta dal server: ' + response);
        if (response.rc === true && response && response.dati) {
          this.clienti = response.dati;
          console.log(this.clienti);
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
    this.showOrHideClienti = true;
  }
}
