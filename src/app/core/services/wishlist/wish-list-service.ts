import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class WishListService {
  private _HttpClient = inject(HttpClient)
  private _PLATFORM_ID = inject(PLATFORM_ID);
  wishListNum: BehaviorSubject<number> = new BehaviorSubject<number>(0)


  constructor() {
    this.initializeWishList();
  }

  initializeWishList(): void {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      this.getWishListProducts().subscribe({
        next: (res) => {
          this.wishListNum.next(res.count);
        },
        error: (err) => {
          this.wishListNum.next(0);
        }
      });
    } else {
      this.wishListNum.next(0);
    }
  }

  addProductToWishList(Id: string | null): Observable<any> {
    return this._HttpClient.post((`${environment.baseUrl}/wishlist`),
      { productId: Id })
  }

  getWishListProducts(): Observable<any> {
    return this._HttpClient.get((`${environment.baseUrl}/wishlist`))
  }

  removeProductFromWishList(Id: string): Observable<any> {
    return this._HttpClient.delete((`${environment.baseUrl}/wishlist/${Id}`))
  }
}
