import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

import { UserService } from './user.service';
import { environment } from '../../../environments/environment';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from '../interfaces';
import {
  loginResponseData,
  registerResponseData,
} from '../../../../testing/data/index';

const BASE_URL = environment.BASE_URL;

describe('UserService', () => {
  let service: UserService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(UserService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  it('should get user availability from endpoint', (done) => {
    const email = 'jhondoe@gmail.com';
    service.getUserAvailability(email).subscribe(({ isAvailable }) => {
      expect(isAvailable).toBeTruthy();
      done();
    });

    httpTesting
      .expectOne({
        method: 'GET',
        url: `${BASE_URL}/users/${email}/taken`,
      })
      .flush({
        isAvailable: true,
      });
  });

  it('should get login from endpoint', (done) => {
    const userLogin: LoginRequest = {
      email: 'jhondoe@gmail.com',
      password: '123456',
    };
    service.login(userLogin).subscribe((loginResponse: LoginResponse) => {
      expect(loginResponse).toEqual(loginResponseData);
      done();
    });

    httpTesting
      .expectOne({
        method: 'POST',
        url: `${BASE_URL}/users/login`,
      })
      .flush(loginResponseData);
  });

  it('should send register to endpoint', (done) => {
    const newUser: RegisterRequest = {
      email: 'jhonDoe@gmail.com',
      name: 'Jhon',
      surname: 'Doe',
      password: '123456',
    };
    service
      .register(newUser)
      .subscribe((registerResponse: RegisterResponse) => {
        expect(registerResponse).toEqual(registerResponseData);
        done();
      });

    httpTesting
      .expectOne({
        method: 'POST',
        url: `${BASE_URL}/users/register`,
      })
      .flush(registerResponseData);
  });
});
