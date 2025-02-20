import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private configURL = 'config.json';

  constructor(private http: HttpClient) {}

  getConfig() {
    return this.http.get(this.configURL);
  }
}
