import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable, tap } from 'rxjs';

import { environment } from '../../../environments/environment';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  UserAvailabilityResponse,
} from '../interfaces';
import { AuthService } from './auth.service';

const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  getUserAvailability(email: string): Observable<UserAvailabilityResponse> {
    return this.http.get<UserAvailabilityResponse>(
      `${BASE_URL}/users/${email}/taken`
    );
  }

  login(userLogin: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${BASE_URL}/users/login`, userLogin)
      .pipe(
        tap((resp) => {
          const { name, surname } = resp.user;
          const nameAndSurname = `${name} ${surname}`;
          this.authService.saveNameAndSurnameToStorage(nameAndSurname);
        })
      );
  }

  register(newUser: RegisterRequest): Observable<RegisterResponse> {
    return this.http
      .post<RegisterResponse>(`${BASE_URL}/users/register`, newUser)
      .pipe(
        tap((resp) => {
          const { name, surname } = resp.user;
          const nameAndSurname = `${name} ${surname}`;
          this.authService.saveNameAndSurnameToStorage(nameAndSurname);
        })
      );
  }
}
