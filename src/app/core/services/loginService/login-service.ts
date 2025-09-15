import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { Router } from '@angular/router';
import { DecodeService } from '../decodeService/decode-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private _HttpClient = inject(HttpClient)
  private _Router = inject(Router)
  private _DecodeService = inject(DecodeService)

  sendRegisterForm(payload: object): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/auth/signin`, payload)
  }

  logOut() {
    // remove token
    localStorage.removeItem('token')
    // userData = null
    this._DecodeService.userDataLogIn.next(null)
    // navigate to login
    this._Router.navigate(['/logIn'])
  }
}
