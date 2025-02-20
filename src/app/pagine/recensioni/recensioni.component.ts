import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recensione } from '../../interfacce/Recensione';
import { RecensioneService } from '../../servizi/recensione/recensione.service';

@Component({
  selector: 'app-recensioni',
  standalone: false,
  templateUrl: './recensioni.component.html',
  styleUrl: './recensioni.component.css'
})
export class RecensioniComponent implements OnInit {

  constructor(private serv: RecensioneService, private router: Router){}
  
    idCliente = +localStorage.getItem('idCliente')!;
    msg: string = '';
    rc: boolean = true;
    isLoading: boolean;
      recensioni: Recensione[];

  ngOnInit(): void {
    this.isLoading=true;
    this.serv.listaRecensioniUtente(this.idCliente).subscribe((r:any) => {
      if (r.rc) {
        this.recensioni = r.dati;
      } else {
        this.rc = r.rc;
        this.msg = r.msg;
      }
    });
    this.isLoading=false;
  }

  modificaRecensione(id:number) {

  }

  eliminaRecensione(id:number) {

  }
}
