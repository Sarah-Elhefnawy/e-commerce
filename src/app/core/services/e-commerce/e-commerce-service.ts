import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ECommerceService {
  private _HttpClient = inject(HttpClient);

  getProducts(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/products`);
  }

  getOneProduct(id: string | null): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/products/${id}`);
  }
}
