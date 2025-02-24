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

  // Create a new wishlist
  createWishlist(idCliente: number): Observable<any> {
    // Assuming a new WishlistRequest is required here with other fields (like idProdotti)
    const requestBody = { idCliente };  // You may need to expand this as per actual API needs
    return this.http.post<any>(this.createWishlistUrl, requestBody);
  }

  // Get all products in the wishlist
  getWishlist(idCliente: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}?idCliente=${idCliente}`);
  }

  // Add a product to the wishlist
  addProductToWishlist(idCliente: number, idProdotti: number[]): Observable<any> {
    const wishlistRequest = {
      idCliente: idCliente,
      idProdotti: idProdotti,  // List of product IDs to add
    };
    return this.http.post<any>(this.addProductUrl, wishlistRequest);
  }

  // Remove a product from the wishlist
  removeProductFromWishlist(idCliente: number, idProdotto: number): Observable<any> {
    const wishlistRequest = {
      idCliente: idCliente,
      idProdotti: [idProdotto],  // Single product ID in an array (as per controller)
    };
    return this.http.post<any>(this.removeProductUrl, wishlistRequest);
  }

  // Clear all products from the wishlist
  clearAllWishlist(idCliente: number): Observable<any> {
    const wishlistRequest = {
      idCliente: idCliente,  // Pass client ID to clear their wishlist
    };
    return this.http.post<any>(this.clearWishlistUrl, wishlistRequest);
  }
}
