import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { IForgotPassword, IPassword, IResetPassword } from '../../interfaces/Auth/iforgot-password';

@Injectable({
  providedIn: 'root'
})
export class ForgetPassword {
  constructor(private _HttpClient:HttpClient){}

  forgotPassword(payload:IForgotPassword):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/auth/forgotPasswords`, payload)
  }

  resetCode(payload:IResetPassword):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/auth/verifyResetCode`, payload)
  }

  resetPassword(payload:IPassword):Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}/auth/resetPassword`, payload)
  }
}
