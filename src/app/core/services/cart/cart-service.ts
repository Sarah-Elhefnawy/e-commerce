import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _HttpClient = inject(HttpClient)
  private _PLATFORM_ID = inject(PLATFORM_ID);
  cartNum: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  private tokenHttp: string | null = null;


  constructor() {
    this.initializeToken();
    this.initializeCart();
  }

  initializeCart(): void {
    if (isPlatformBrowser(this._PLATFORM_ID) && this.tokenHttp) {
      this.getCartProducts().subscribe({
        next: (res) => {
          this.cartNum.next(res.numOfCartItems);
        },
        error: (err) => {
          console.error('Error loading cart:', err);
          this.cartNum.next(0);
        }
      });
    } else {
      this.cartNum.next(0);
    }
  }

  initializeToken(): void {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      this.tokenHttp = localStorage.getItem('token');
    }
  }

  getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    this.initializeToken();

    if (this.tokenHttp) {
      headers = headers.set('token', this.tokenHttp);
    }
    return headers;
  }

  addProductToCart(Id: string | null): Observable<any> {
    return this._HttpClient.post((`${environment.baseUrl}/cart`),
      { productId: Id },
      { headers: this.getHeaders() })
  }

  getCartProducts(): Observable<any> {
    return this._HttpClient.get((`${environment.baseUrl}/cart`),
      { headers: this.getHeaders() })
  }

  updateProductCart(count: number, productId: string): Observable<any> {
    return this._HttpClient.put((`${environment.baseUrl}/cart/${productId}`),
      { count: count },
      { headers: this.getHeaders() })
  }

  deleteProductCart(Id: string): Observable<any> {
    return this._HttpClient.delete((`${environment.baseUrl}/cart/${Id}`),
      { headers: this.getHeaders() })
  }

  clearCart(): Observable<any> {
    return this._HttpClient.delete((`${environment.baseUrl}/cart`),
      { headers: this.getHeaders() })
  }

  // updateToken(token: string | null): void {
  //   this.tokenHttp = token;
  //   if (isPlatformBrowser(this._PLATFORM_ID) && token) {
  //     localStorage.setItem('token', token);
  //   } else if (isPlatformBrowser(this._PLATFORM_ID)) {
  //     localStorage.removeItem('token');
  //   }
  //   // Refresh cart data when token changes
  //   this.initializeCart();
  // }

}
