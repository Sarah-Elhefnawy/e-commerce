import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private _HttpClient = inject(HttpClient)

  constructor(@Inject(PLATFORM_ID) private id: Object) {
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

  getUserOrders(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/orders/user/${this.userData.id}`)
  }
}
