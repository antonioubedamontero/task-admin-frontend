import { inject, Injectable, signal } from '@angular/core';

import { Observable, of, tap } from 'rxjs';

import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  UserAvailabilityResponse,
} from '../../src/app/auth/interfaces';
import { loginResponseData, registerResponseData } from '../../testing/data';
import { AuthServiceMock } from './auth-service.mock';

export const isAvailableMock = signal(true);

@Injectable({
  providedIn: 'root',
})
export class UserServiceMock {
  authService = inject(AuthServiceMock);

  getUserAvailability(email: string): Observable<UserAvailabilityResponse> {
    return of({
      isAvailable: isAvailableMock(),
    });
  }

  login(userLogin: LoginRequest): Observable<LoginResponse> {
    return of(loginResponseData).pipe(
      tap((resp) => this.saveUserToStorage(resp))
    );
  }

  register(newUser: RegisterRequest): Observable<RegisterResponse> {
    return of(registerResponseData).pipe(
      tap((resp) => this.saveUserToStorage(resp))
    );
  }

  private saveUserToStorage(resp: LoginResponse | RegisterResponse): void {
    const { token } = resp;
    const { name, surname } = resp.user;
    const nameAndSurname = `${name} ${surname}`;

    this.authService.saveNameAndSurnameToStorage(nameAndSurname);
    this.authService.saveTokenToStorage(token);
  }
}
