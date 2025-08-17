import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';

import { firstValueFrom } from 'rxjs';

import { AuthService } from '../services';

export const authGuard: CanMatchFn = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.token();

  if (!token) {
    return redirectToLogin(router);
  }

  const { isValidToken } = await firstValueFrom(
    authService.validateToken({ token })
  );

  if (!isValidToken) {
    authService.logout();
    return redirectToLogin(router);
  }

  return true;
};

const redirectToLogin = (router: Router) => {
  router.navigateByUrl('/auth/login');
  return false;
};
