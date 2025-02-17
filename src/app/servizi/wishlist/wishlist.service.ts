import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../interfacce/Wishlist';


@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private apiUrl = 'http://localhost:9090/rest/wishlist/getAllProducts';

  constructor(private http: HttpClient) {}

  getWishlist(idCliente: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}?idCliente=${idCliente}`);
  }
}
