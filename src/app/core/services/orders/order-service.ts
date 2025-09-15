import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { DecodeService } from '../decodeService/decode-service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private _HttpClient = inject(HttpClient)
  private _DecodeService = inject(DecodeService)
  private _PLATFORM_ID = inject(PLATFORM_ID);
  orderNum: BehaviorSubject<number> = new BehaviorSubject<number>(0)

  constructor() {
    this.initializeCart();
  }

  initializeCart(): void {
    if (isPlatformBrowser(this._PLATFORM_ID) && localStorage.getItem('token')) {
      this.getUserOrders().subscribe({
        next: (res) => {
          this.orderNum.next(res.length);
        },
        error: (err) => {
          this.orderNum.next(0);
        }
      });
    } else {
      this.orderNum.next(0);
    }
  }

  getUserOrders(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/orders/user/${this._DecodeService.userData.id}`)
  }
}
