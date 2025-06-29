import { inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';

import { AuthService } from '../services';

export const loginOrRegisterGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.token();

  if (token) {
    router.navigateByUrl('/tasks');
    return false;
  }

  return true;
};
