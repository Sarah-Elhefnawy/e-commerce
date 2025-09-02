import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { ISignUp } from '../../interfaces/Auth/isign-up';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _HttpClient = inject(HttpClient)

  sendRegisterForm(payload: ISignUp | any): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/auth/signup`, payload)
  }
}
