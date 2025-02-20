import { Component, Inject, inject, Input } from '@angular/core';
import { LoaderService } from '../../servizi/loader.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  isLoading: boolean;
  constructor(private loader: LoaderService) {}

  ngOnInit(): void {
    this.loader.loaderState.subscribe((state) => {
      this.isLoading = state;
    });
  }
}
