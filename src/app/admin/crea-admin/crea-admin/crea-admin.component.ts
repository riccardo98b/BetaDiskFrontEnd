import { Component, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-crea-admin',
  standalone: false,
  templateUrl: './crea-admin.component.html',
  styleUrl: './crea-admin.component.css',
})
export class CreaAdminComponent {
  sceltaForm: string = 'admin-no-cliente';
}
