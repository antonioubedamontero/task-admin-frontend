import { inject, Injectable, signal } from '@angular/core';

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token?: string;
  nameAndSurname = signal<string>('');

  userService = inject(UserService);

  constructor() {
    // Persist token and name and surname
    this.getTokenFromStorage();
    this.getNameSurnameFromStorage();
  }

  saveTokenToStorage(token: string): void {
    if (!token) return;
    this.token = token;
    localStorage.setItem('token', token);
  }

  getTokenFromStorage(): void {
    const token = localStorage.getItem('token');
    if (!token) return;
    this.token = token;
  }

  saveNameAndSurnameToStorage(nameSurname: string): void {
    if (!nameSurname) return;
    this.nameAndSurname.set(nameSurname);
    localStorage.setItem('nameAndSurname', nameSurname);
  }

  getNameSurnameFromStorage(): void {
    const nameSurname = localStorage.getItem('nameAndSurname');
    if (!nameSurname) return;
    this.nameAndSurname.set(nameSurname);
  }
}
