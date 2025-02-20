import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loaderSubject = new BehaviorSubject<boolean>(false);
  loaderState = this.loaderSubject.asObservable();

  startLoader() {
    this.loaderSubject.next(true);
  }
  stopLoader() {
    this.loaderSubject.next(false);
  }
  constructor() {}
}
