import { authRoutes } from './auth.routes';
import { loginOrRegisterGuard } from './auth/guards';

describe('AuthRoutes', () => {
  it('should have a login route', () => {
    const loginRoute = authRoutes.find((route) => route.path === 'login');
    expect(typeof loginRoute?.loadComponent).toBe('function');
    expect(loginRoute?.canMatch).toEqual([loginOrRegisterGuard]);
  });

  it('should have a register route', () => {
    const registerRoute = authRoutes.find((route) => route.path === 'register');
    expect(typeof registerRoute?.loadComponent).toBe('function');
    expect(registerRoute?.canMatch).toEqual([loginOrRegisterGuard]);
  });

  it('should have a fallback route', () => {
    const fallbackRoute = authRoutes.find((route) => route.path === '**');
    expect(fallbackRoute?.redirectTo).toBe('login');
  });
});
