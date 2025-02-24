import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../interfacce/Wishlist';
import { Prodotto } from '../../interfacce/Prodotto';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private baseUrl = 'http://localhost:9090/rest/wishlist';

  private createWishlistUrl = 'http://localhost:9090/rest/wishlist/create';
  private apiUrl = 'http://localhost:9090/rest/wishlist/getAllProducts';
  private addProductUrl = 'http://localhost:9090/rest/wishlist/addProduct';
  private removeProductUrl = 'http://localhost:9090/rest/wishlist/removeProduct';
  private clearWishlistUrl = 'http://localhost:9090/rest/wishlist/clearWishlist';

  constructor(private http: HttpClient) {}

  createWishlist(idCliente: number): Observable<any> {
    const requestBody = { idCliente };
    return this.http.post<any>(this.createWishlistUrl, requestBody);
  }


  getWishlist(idCliente: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}?idCliente=${idCliente}`);
  }

  addProductToWishlist(idCliente: number, idProdotti: number[]): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/addProduct`, {
      idCliente: idCliente,
      idProdotti: idProdotti,
    });
  }

  removeProductFromWishlist(idCliente: number, idProdotto: number): Observable<any> {
    const wishlistRequest = {
        idCliente: idCliente,
        idProdotti: [idProdotto]
    };

    return this.http.post<any>(this.removeProductUrl, wishlistRequest);
}
  clearAllWishlist(idCliente: number): Observable<any> {
    const wishlistRequest = {
        idCliente: idCliente
    };

    return this.http.post<any>(this.clearWishlistUrl, wishlistRequest);
  }

}
