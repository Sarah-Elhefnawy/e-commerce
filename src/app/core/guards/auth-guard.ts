import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { DecodeService } from '../services/decodeService/decode-service';

export const authGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router)
  const _DecodeService = inject(DecodeService)

  if (_DecodeService.userDataLogIn.getValue() !== null) {
    return true;
  } else {
    // _Router.navigate(['/logIn'])
    // return false
    return _Router.parseUrl('/logIn')
  }
};
