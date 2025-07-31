import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';
import { LocalStorageMock } from '../../testing/services';

const BASE_URL = environment.BASE_URL;

describe('AuthService', () => {
  let service: AuthService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: localStorage,
          useClass: LocalStorageMock,
        },
      ],
    });
    service = TestBed.inject(AuthService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call validate token and its correct', (done) => {
    const token = {
      token: '123',
    };
    service.validateToken(token).subscribe(({ isValidToken }) => {
      expect(isValidToken).toEqual(true);
      done();
    });

    httpTesting
      .expectOne({
        method: 'POST',
        url: `${BASE_URL}/users/validate-token`,
      })
      .flush({
        isValidToken: true,
      });
  });

  it('should call validate token and its invalid token', (done) => {
    const token = {
      token: '123',
    };
    service.validateToken(token).subscribe(({ isValidToken }) => {
      expect(isValidToken).toEqual(false);
      done();
    });

    httpTesting
      .expectOne({
        method: 'POST',
        url: `${BASE_URL}/users/validate-token`,
      })
      .flush({
        isValidToken: false,
      });
  });

  describe('- should manage storage', () => {
    beforeEach(() => {
      service.logout();
    });

    it('should not get token if not saved previously', () => {
      service.getTokenFromStorage();
      expect(localStorage.getItem('token')).toBeFalsy();
      expect(service.token()).toBeFalsy();
    });

    it('should get token if saved previously', () => {
      service.saveTokenToStorage('123');
      expect(localStorage.getItem('token')).toBe('123');
      expect(service.token()).toBe('123');
    });

    it('should not get name and surname if not saved previously', () => {
      service.getNameSurnameFromStorage();
      expect(localStorage.getItem('nameAndSurname')).toBeFalsy();
      expect(service.nameAndSurname()).toBeFalsy();
    });

    it('should get name and surname if saved previously', () => {
      service.saveNameAndSurnameToStorage('John Doe');
      expect(localStorage.getItem('nameAndSurname')).toBe('John Doe');
      expect(service.nameAndSurname()).toBe('John Doe');
    });

    it('should clear storage and properties when logout', fakeAsync(() => {
      service.logout();
      tick();
      expect(service.token()).toBeFalsy();
      expect(service.nameAndSurname()).toBe('');
      expect(localStorage.getItem('token')).toBeFalsy();
      expect(localStorage.getItem('nameAndSurname')).toBe(null);
    }));
  });
});
