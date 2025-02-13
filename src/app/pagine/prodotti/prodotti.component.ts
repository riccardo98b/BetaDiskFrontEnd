import { Component, OnInit } from '@angular/core';
import { ProdottiService } from '../../servizi/prodotti/prodotti.service';

@Component({
  selector: 'app-prodotti',
  standalone: false,
  templateUrl: './prodotti.component.html',
  styleUrl: './prodotti.component.css',
})
export class ProdottiComponent implements OnInit {
  prodotto: any;
  response: any;
  data: any;

  constructor(private service: ProdottiService) {}

  ngOnInit(): void {
    this.service.listAll().subscribe((resp) => {
      this.response = resp;
      this.data = this.response.dati;
      console.log(this.data);
    });
  }
}
