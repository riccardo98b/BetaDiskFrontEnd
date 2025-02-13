import { Component } from '@angular/core';
import {ChangeDetectionStrategy, signal} from '@angular/core';

@Component({
  selector: 'app-carrello',
  standalone: false,
  templateUrl: './carrello.component.html',
  styleUrl: './carrello.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarrelloComponent {
  readonly panelOpenState = signal(false);
}
