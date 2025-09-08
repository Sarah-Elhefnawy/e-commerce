import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private _HttpClient = inject(HttpClient)
  private tokenHttp: string | null = null;

  constructor(@Inject(PLATFORM_ID) private id: Object) {
    if (isPlatformBrowser(id)) {
      if (localStorage.getItem('token')) {
        this.decodeUserData()
      }
    }
  }

  initializeToken(): void {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      this.tokenHttp = localStorage.getItem('token');
    }
  }
  _PLATFORM_ID(_PLATFORM_ID: any) {
    throw new Error('Method not implemented.');
  }

  getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    this.initializeToken();

    if (this.tokenHttp) {
      headers = headers.set('token', this.tokenHttp);
    }
    return headers;
  }

  userData!: any
  decodeUserData() {
    const token = localStorage.getItem('token')!
    const decoded = jwtDecode(token)
    this.userData = decoded
  }

  getUserOrders(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/orders/user/${this.userData.id}`,
      { headers: this.getHeaders() })
  }
}
