import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  if (JSON.parse(localStorage.getItem('ae_token') || '') != '') {
    return true;
  } else {
    console.log('No access');
    return false;
  }
};
