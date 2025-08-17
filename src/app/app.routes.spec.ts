import { routes } from './app.routes';
import { authRoutes } from './auth.routes';
import { authGuard } from './auth/guards';
import { taskRoutes } from './task.routes';

describe('AppRoutes', () => {
  it('should have a blank route', () => {
    const blankRoute = routes.find((route) => route.path === '');
    expect(blankRoute?.pathMatch).toBe('full');
    expect(blankRoute?.redirectTo).toBe('tasks');
  });

  it('should have an auth route', () => {
    const authRoute = routes.find((route) => route.path === 'auth');
    expect(typeof authRoute?.loadComponent).toBe('function');
    expect(authRoute?.children).toEqual(authRoutes);
  });

  it('should have a task route', () => {
    const taskRoute = routes.find((route) => route.path === 'tasks');
    expect(taskRoute?.canMatch).toEqual([authGuard]);
    expect(typeof taskRoute?.loadComponent).toBe('function');
    expect(taskRoute?.children).toEqual(taskRoutes);
  });

  it('should have a fallback route', () => {
    const fallbackRoute = routes.find((route) => route.path === '**');
    expect(fallbackRoute?.redirectTo).toBe('tasks');
  });
});
