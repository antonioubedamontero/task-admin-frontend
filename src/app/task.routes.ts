import { Routes } from '@angular/router';

export const taskRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./tasks/pages/tasks/tasks.component')
  },
  {
    path: 'new',
    loadComponent: () => import('./tasks/pages/new-task/new-task.component')
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./tasks/pages/update-task/update-task.component')
  },
  {
    path: ':id',
    loadComponent: () => import('./tasks/pages/task-details/task-details.component')
  },
  {
    path: 'state/:state',
    loadComponent: () => import('./tasks/pages/tasks-by-state/tasks-by-state.component')
  },
  {
    path: '**',
    redirectTo: ''
  }
];
