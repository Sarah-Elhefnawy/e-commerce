import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private _HttpClient = inject(HttpClient)

  sendRegisterForm(payload: object): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/auth/signin`, payload)
  }
}
