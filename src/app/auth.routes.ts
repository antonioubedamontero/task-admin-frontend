import { Routes } from '@angular/router';

import { loginOrRegisterGuard } from './auth/guards';

export const authRoutes: Routes = [
  {
    path: 'login',
    canMatch: [loginOrRegisterGuard],
    loadComponent: () => import('./auth/pages/login/login.component'),
  },
  {
    path: 'register',
    canMatch: [loginOrRegisterGuard],
    loadComponent: () => import('./auth/pages/register/register.component'),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
