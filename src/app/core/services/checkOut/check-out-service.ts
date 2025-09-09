import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class CheckOutService {
  private _HttpClient = inject(HttpClient)

  userData!: any

  constructor(@Inject(PLATFORM_ID) private id: Object) {
    if (isPlatformBrowser(id)) {
      if (localStorage.getItem('token')) {
        this.decodeUserData()
      }
    }
  }

  decodeUserData() {
    const token = localStorage.getItem('token')!
    const decoded = jwtDecode(token)
    this.userData = decoded
  }

  CheckOut(shoppingAddress: any, cartId: string | null): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/orders/checkout-session/${cartId}?url=http://localhost:4200`,
      { shippingAddress: shoppingAddress })
  }

  payCash(shoppingAddress: any, cartId: string): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/orders/${cartId}`,
      { shippingAddress: shoppingAddress })
  }
}
