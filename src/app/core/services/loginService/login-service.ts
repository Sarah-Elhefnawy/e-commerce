import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private _HttpClient = inject(HttpClient)
  private _Router = inject(Router)
  constructor(@Inject(PLATFORM_ID) private id:Object){
    if(isPlatformBrowser(id)){
      if (localStorage.getItem('token')) {
        this.decodeUserData()
      }
    }
  }

  userData: BehaviorSubject<null | JwtPayload> = new BehaviorSubject<null | JwtPayload>(null)

  sendRegisterForm(payload: object): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/auth/signin`, payload)
  }

  decodeUserData() {
    const token = localStorage.getItem('token')!
    const decoded = jwtDecode(token)
    // console.log(decoded);
    this.userData.next(decoded)
  }

  logOut(){
    // remove token
    localStorage.removeItem('token')
    // userData = null
    this.userData.next(null)
    // navigate to login
    this._Router.navigate(['/logIn'])
  }
}
