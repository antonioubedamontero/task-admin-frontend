import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ValidateTokenRequest, ValidateTokenResponse } from '../interfaces';

const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token = signal<string | null>(null);
  nameAndSurname = signal<string>('');

  private http = inject(HttpClient);

  constructor() {
    // Persist token and name and surname
    this.getTokenFromStorage();
    this.getNameSurnameFromStorage();
  }

  validateToken(
    validateTokenRequest: ValidateTokenRequest
  ): Observable<ValidateTokenResponse> {
    return this.http.post<ValidateTokenResponse>(
      `${BASE_URL}/users/validate-token`,
      validateTokenRequest
    );
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
