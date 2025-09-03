import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/loginService/login-service';

export const authGuard: CanActivateFn = (route, state) => {
  const _LoginService = inject(LoginService)
  const _Router = inject(Router)
  if (_LoginService.userData.getValue() !== null) {
    return true;
  } else {
    // _Router.navigate(['/logIn'])
    // return false
    return _Router.parseUrl('/logIn')
  }
};
