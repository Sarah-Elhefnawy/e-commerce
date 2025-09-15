import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CheckOutService {
  private _HttpClient = inject(HttpClient)

  CheckOut(shoppingAddress: any, cartId: string | null): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/orders/checkout-session/${cartId}?url=http://localhost:4200`,
      { shippingAddress: shoppingAddress })
  }

  payCash(shoppingAddress: any, cartId: string): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/orders/${cartId}`,
      { shippingAddress: shoppingAddress })
  }
}
