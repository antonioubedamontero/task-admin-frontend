import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';

import { AuthService } from '../services';

export const loginOrRegisterGuard: CanMatchFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.token();

  if (token) {
    router.navigateByUrl('/tasks');
    return false;
  }

  return true;
};
