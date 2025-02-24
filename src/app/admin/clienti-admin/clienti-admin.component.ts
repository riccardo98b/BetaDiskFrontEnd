import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogUtenteComponent } from '../../dialog/dialog-utente/dialog-utente/dialog-utente.component';
import { ClienteService } from '../../servizi/cliente/cliente.service';
import { UtenteService } from '../../servizi/utente/utente.service';
import { DialogStringaComponent } from '../../dialog/dialog-stringa/dialog-stringa.component';
import { DialogConfermaComponent } from '../../dialog/dialog-conferma/dialog-conferma/dialog-conferma.component';

@Component({
  selector: 'app-clienti-admin',
  templateUrl: './clienti-admin.component.html',
  styleUrls: ['./clienti-admin.component.css'],
  standalone: false,
})
export class ClientiAdminComponent {
  clienti: any[] = [];
  campoSelezionato: string = '';
  tipoRicerca: string = '';
  ruoloSelezionato: string = '';

  constructor(
    private clienteService: ClienteService,
    private utenteService: UtenteService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.caricaDatiClienti();
  }

  caricaDatiClienti(): void {
    this.clienteService.listAllClienti().subscribe(
      (response: any) => {
        if (response.rc === true && response.dati) {
          this.clienti = response.dati;
        }
      },
      (errore) => {
        console.error('Errore nel caricamento dei clienti:', errore);
      }
    );
  }

  modificaCliente(idCliente: number): void {
    const cliente = this.clienti.find((c) => c.idCliente === idCliente);

    if (cliente) {
      const dialogRef = this.dialog.open(DialogUtenteComponent, {
        minWidth: '500px',
        data: { cliente },
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log('Dialogo chiuso con risultato: ', result);
        this.caricaDatiClienti();
      });
    }
  }

  eliminaCliente(idCliente: number): void {
    const cliente = this.clienti.find((c) => c.idCliente === idCliente);
    if (cliente) {
      const clienteBody = { idCliente: cliente.idCliente };
      this.clienteService
        .deleteCliente(clienteBody)
        .subscribe((response: any) => {
          if (response.rc === true) {
            console.log('Cliente eliminato con successo');
            if (cliente.utente) {
              const utenteBody = { idUtente: cliente.utente.idUtente };
              this.utenteService.deleteUtente(utenteBody).subscribe(
                (utenteResponse: any) => {
                  if (response.rc === true) {
                    console.log('Utente associato eliminato con successo');
                    this.clienti = this.clienti.filter(
                      (c) => c.idCliente !== idCliente
                    );
                    const dialogRef = this.dialog.open(
                      DialogConfermaComponent,
                      {
                        minWidth: '500px',
                        data: { messaggio: 'Cliente  eliminato con successo!' },
                      }
                    );

                    dialogRef.afterClosed().subscribe((result) => {
                      console.log(
                        'Dialog di conferma chiuso con risultato: ',
                        result
                      );
                    });
                  } else {
                    console.error(
                      "Errore durante l'eliminazione dell'utente associato:",
                      utenteResponse
                    );
                  }
                },
                (error) => {
                  console.error(
                    "Errore durante l'eliminazione dell'utente associato:",
                    error
                  );
                }
              );
            }
          }
        });
    }
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

  cercaEmail() {
    this.tipoRicerca = 'email';
    this.openDialog();
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
  cercaProvincia() {
    this.tipoRicerca = 'provincia';
    this.openDialog();
  }
  cercaComune() {
    this.tipoRicerca = 'comune';
    this.openDialog();
  }

  cercaClientiDopoCheck(query: string, tipoRicerca: string): void {
    // Prepara i parametri per la ricerca
    let nome = tipoRicerca === 'nome' ? query : '';
    let cognome = tipoRicerca === 'cognome' ? query : '';
    let cap = tipoRicerca === 'cap' ? query : '';
    let provincia = tipoRicerca === 'provincia' ? query : '';
    let comune = tipoRicerca === 'comune' ? query : '';
    let email = tipoRicerca === 'email' ? query : '';

    if (tipoRicerca === 'email' || tipoRicerca === 'username') {
      this.utenteService.listAllUtenti(email).subscribe((response: any) => {
        if (response.rc === true && response.dati) {
          this.clienti = [];
          response.dati.forEach((utente: any) => {
            const idCliente = utente.cliente.idCliente;
            if (idCliente) {
              this.getClienteById(idCliente);
            }
          });
        }
      });
    } else {
      this.clienteService
        .listAllClienti(nome, cognome, cap, provincia, comune)
        .subscribe((response: any) => {
          if (response.rc === true && response.dati) {
            this.clienti = response.dati;
          }
        });
    }
  }

  getClienteById(idCliente: number): void {
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

  reset(): void {
    this.clienti = [];
    this.caricaDatiClienti();
  }
}
