import { Routes } from '@angular/router';

import { taskRoutes } from './task.routes';
import { authRoutes } from './auth.routes';
import { authGuard } from './auth/guards';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'tasks',
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./auth/layouts/auth-layout/auth-layout.component'),
    children: [...authRoutes],
  },
  {
    path: 'tasks',
    canMatch: [authGuard],
    loadComponent: () =>
      import('./tasks/layouts/tasks-layout/tasks-layout.component'),
    children: [...taskRoutes],
  },
  {
    path: '**',
    redirectTo: 'tasks',
  },
];
