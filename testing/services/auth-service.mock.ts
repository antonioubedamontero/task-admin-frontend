import { inject, Injectable, signal } from '@angular/core';

import { Observable, of } from 'rxjs';

import {
  ValidateTokenRequest,
  ValidateTokenResponse,
} from '../../src/app/auth/interfaces';
import { LocalStorageMock } from './local-storage';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceMock {
  token = signal<string | null>(null);
  nameAndSurname = signal<string>('');

  localStorage = inject(LocalStorageMock);

  constructor() {
    // Persist token and name and surname
    this.getTokenFromStorage();
    this.getNameSurnameFromStorage();
  }

  validateToken(
    validateTokenRequest: ValidateTokenRequest
  ): Observable<ValidateTokenResponse> {
    return of({ isValidToken: true });
  }

  saveTokenToStorage(token: string): void {
    this.token.set(token);
    localStorage.setItem('token', token);
  }

  getTokenFromStorage(): void {
    const token = localStorage.getItem('token');
    if (!token) return;
    this.token.set(token);
  }

  saveNameAndSurnameToStorage(nameSurname: string): void {
    this.nameAndSurname.set(nameSurname);
    localStorage.setItem('nameAndSurname', nameSurname);
  }

  getNameSurnameFromStorage(): void {
    const nameSurname = localStorage.getItem('nameAndSurname');
    if (!nameSurname) return;
    this.nameAndSurname.set(nameSurname);
  }

  logout(): void {
    this.token.set(null);
    this.nameAndSurname.set('');
    localStorage.removeItem('nameAndSurname');
    localStorage.removeItem('token');
  }
}
