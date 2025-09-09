import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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


  constructor() {
    this.initializeCart();
  }

  initializeCart(): void {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      this.getCartProducts().subscribe({
        next: (res) => {
          this.cartNum.next(res.numOfCartItems);
        },
        error: (err) => {
          this.cartNum.next(0);
        }
      });
    } else {
      this.cartNum.next(0);
    }
  }

  addProductToCart(Id: string | null): Observable<any> {
    return this._HttpClient.post((`${environment.baseUrl}/cart`),
      { productId: Id })
  }

  getCartProducts(): Observable<any> {
    return this._HttpClient.get((`${environment.baseUrl}/cart`))
  }

  updateProductCart(count: number, productId: string): Observable<any> {
    return this._HttpClient.put((`${environment.baseUrl}/cart/${productId}`),
      { count: count })
  }

  deleteProductCart(Id: string): Observable<any> {
    return this._HttpClient.delete((`${environment.baseUrl}/cart/${Id}`))
  }

  clearCart(): Observable<any> {
    return this._HttpClient.delete((`${environment.baseUrl}/cart`))
  }
}
