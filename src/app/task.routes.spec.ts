import { taskRoutes } from './task.routes';

describe('TaskRoutes', () => {
  it('should have a blank route', () => {
    const blankRoute = taskRoutes.find((route) => route.path === '');
    expect(typeof blankRoute?.loadComponent).toBe('function');
    expect(blankRoute?.pathMatch).toBe('full');
  });

  it('should have a new route', () => {
    const newRoute = taskRoutes.find((route) => route.path === 'new');
    expect(typeof newRoute?.loadComponent).toBe('function');
  });

  it('should have an edit route', () => {
    const editRoute = taskRoutes.find((route) => route.path === ':id/edit');
    expect(typeof editRoute?.loadComponent).toBe('function');
  });

  it('should have a view route', () => {
    const viewRoute = taskRoutes.find((route) => route.path === ':id');
    expect(typeof viewRoute?.loadComponent).toBe('function');
  });

  it('should have a fallback', () => {
    const fallbackRoute = taskRoutes.find((route) => route.path === '**');
    expect(fallbackRoute?.redirectTo).toBe('');
  });
});
