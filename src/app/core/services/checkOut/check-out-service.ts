import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  private _PLATFORM_ID = inject(PLATFORM_ID);

  private tokenHttp: string | null = null;

  constructor(@Inject(PLATFORM_ID) private id: Object) {
    this.initializeToken();

    if (isPlatformBrowser(id)) {
      if (localStorage.getItem('token')) {
        this.decodeUserData()
      }
    }
  }
  
  userData!: any

  decodeUserData() {
    const token = localStorage.getItem('token')!
    const decoded = jwtDecode(token)
    this.userData = decoded
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

  CheckOut(shoppingAddress: any, cartId: string | null): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/orders/checkout-session/${cartId}?url=http://localhost:4200`,
      { shippingAddress: shoppingAddress },
      { headers: this.getHeaders() }
    )
  }

  payCash(shoppingAddress: any, cartId: string): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/orders/${cartId}`,
      { shippingAddress: shoppingAddress },
      { headers: this.getHeaders() }
    )
  }
}
