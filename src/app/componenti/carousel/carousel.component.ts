import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Prodotto } from '../../interfacce/Prodotto';
import { ProdottiService } from '../../servizi/prodotti/prodotti.service';

@Component({
  selector: 'app-carousel',
  standalone: false,
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
export class CarouselComponent implements OnInit {
  response: any;
  topTenProdotti: Prodotto[];
  isLoading: boolean;

  constructor(private service: ProdottiService) {}

  ngOnInit(): void {
    this.getCarousel();
  }

  getCarousel() {
    this.isLoading = true;
    this.service.topTenProdotti().subscribe((resp) => {
      console.log(resp);

      this.response = resp;
      if (this.response.rc === true) {
        this.topTenProdotti = this.response.dati;
      } else {
      }
      this.isLoading = false;
    });
  }
}
