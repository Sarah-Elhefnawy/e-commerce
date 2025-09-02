import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  private _HttpClient = inject(HttpClient)

  getAllBrands(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/brands`)
  }
}
