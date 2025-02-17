import { Component, Input, OnInit } from '@angular/core';
import { Prodotto } from '../../interfacce/Prodotto';

@Component({
  selector: 'app-recensione',
  standalone: false,
  templateUrl: './recensione.component.html',
  styleUrl: './recensione.component.css',
})
export class RecensioneComponent implements OnInit {
  @Input() prodotto: Prodotto;
  @Input() recensioni: [];

  ngOnInit(): void {}

  constructor() {}
}
