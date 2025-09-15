import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DecodeService {
  userData!: any
  userDataLogIn: BehaviorSubject<null | JwtPayload> = new BehaviorSubject<null | JwtPayload>(null)


  constructor(@Inject(PLATFORM_ID) private id: Object) {
    if (isPlatformBrowser(id)) {
      if (localStorage.getItem('token')) {
        this.decodeUserData()
      }
    }
  }

  decodeUserData() {
    const token = localStorage.getItem('token')!
    const decoded = jwtDecode(token)
    this.userData = decoded
    this.userDataLogIn.next(decoded)
  }
}
