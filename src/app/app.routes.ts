import { Routes } from '@angular/router';

import { taskRoutes } from './task.routes';
import { authRoutes } from './auth.routes';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'tasks'
  },
  {
    path: 'auth',
    loadComponent: () => import('./auth/layouts/auth-layout/auth-layout.component'),
    children: [...authRoutes]
  },
  {
    path: 'tasks',
    loadComponent: () => import('./tasks/layouts/tasks-layout/tasks-layout.component'),
    children: [...taskRoutes]
  },
  {
    path: '**',
    redirectTo: 'tasks'
  }
];
