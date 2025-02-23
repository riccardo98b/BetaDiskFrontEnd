import { Component, inject } from '@angular/core';
import { ClienteService } from '../../servizi/cliente/cliente.service';
import { Cliente } from '../../interfacce/Cliente';
import { MatDialog } from '@angular/material/dialog';
import { DialogStringaComponent } from '../../dialog/dialog-stringa/dialog-stringa.component';
import { UtenteService } from '../../servizi/utente/utente.service';
import { DialogConfermaComponent } from '../../dialog/dialog-conferma/dialog-conferma/dialog-conferma.component';
@Component({
  selector: 'app-clienti-admin',
  standalone: false,
  templateUrl: './clienti-admin.component.html',
  styleUrls: ['./clienti-admin.component.css'],
})
export class ClientiAdminComponent {
  clienti: Cliente[] = [];
  dialog = inject(MatDialog);
  campoSelezionato: string = '';
  tipoRicerca: string = '';
  ruoloSelezionato: string = '';
  editModeClienteId: number | null = null;

  constructor(
    private clienteService: ClienteService,
    private utenteService: UtenteService
  ) {}

  ngOnInit(): void {
    this.caricaDatiClienti();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogStringaComponent, {
      minWidth: '500px',
      data: { nome: this.campoSelezionato, tipoRicerca: this.tipoRicerca },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.campoSelezionato = result;
      if (this.campoSelezionato) {
        console.log(
          `Hai cercato un ${this.tipoRicerca}: ${this.campoSelezionato}`
        );
        this.cercaClientiDopoCheck(this.campoSelezionato, this.tipoRicerca);
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
  cercaCap() {
    this.tipoRicerca = 'cap';
    this.openDialog();
  }

  cercaProvincia() {
    this.tipoRicerca = 'provincia';
    this.openDialog();
  }
  cercaComune() {
    this.tipoRicerca = 'comune';
    this.openDialog();
  }

  cercaClientiDopoCheck(query: string, tipoRicerca: string): void {
    let nome = tipoRicerca === 'nome' ? query : '';
    let cognome = tipoRicerca === 'cognome' ? query : '';
    let cap = tipoRicerca === 'cap' ? query : '';
    let provincia = tipoRicerca === 'provincia' ? query : '';
    let comune = tipoRicerca === 'comune' ? query : '';

    this.clienteService
      .listAll(nome, cognome, cap, provincia, comune)
      .subscribe((response: any) => {
        console.log('Risposta della ricerca:', response);
        if (response.rc === true && response && response.dati) {
          this.clienti = response.dati;
          console.log(this.clienti);
        }
      });
  }
  setRuolo(ruolo: string) {
    this.ruoloSelezionato = ruolo;
    this.utenteService.utentePerRuolo(ruolo).subscribe(
      (response: any) => {
        if (response.rc === true && response.dati) {
          const utenti = response.dati;
          this.clienti = [];
          utenti.forEach((utente: { cliente: { idCliente: number } }) => {
            const idCliente = utente.cliente.idCliente;
            if (idCliente) {
              this.clienteService.getCliente(idCliente).subscribe(
                (clienteResponse: any) => {
                  if (clienteResponse.rc === true && clienteResponse.dati) {
                    this.clienti.push(clienteResponse.dati);
                  }
                },
                (errore) => {
                  console.error(
                    'Errore nel recupero del cliente per idCliente: ',
                    idCliente,
                    errore
                  );
                }
              );
            }
          });
        }
      },
      (errore) => {
        console.error('Errore nel recupero degli utenti per ruolo: ', errore);
      }
    );
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

  modificaCliente(clienteId: number): void {
    this.editModeClienteId = clienteId;
  }

  salvaModificheCliente(cliente: Cliente) {
    this.clienteService.updateCliente(cliente).subscribe(
      (response: any) => {
        console.log('Risposta dal server:', response);
        if (response.rc === true) {
          this.editModeClienteId = null;
          this.caricaDatiClienti();

          this.dialog.open(DialogConfermaComponent, {
            minWidth: '300px',
            data: { messaggio: 'Modifica effettuata con successo' },
          });
        }
      },
      (errore) => {
        console.error('Errore durante la modifica del cliente:', errore);
      }
    );
  }

  annullaModificheCliente(): void {
    this.editModeClienteId = null;
  }

  reset(): void {
    this.clienti = [];
    this.caricaDatiClienti();
  }
}
