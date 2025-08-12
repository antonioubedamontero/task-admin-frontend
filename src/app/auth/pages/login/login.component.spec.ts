import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter, Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { throwError } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import LoginComponent from './login.component';
import { TranslatePipeMock } from '../../../../../testing/pipes';
import { ModalUserFeedbackComponentMock } from '../../../../../testing/components';
import {
  TranslateServiceMock,
  UserServiceMock,
} from '../../../../../testing/services';

import { UserService } from '../../services';
import { FormService } from '../../../shared/services';
import { environment } from '../../../../environments/environment';

const mockedRoutes = [
  {
    path: 'tasks',
    loadComponent: () =>
      import('../../../../../testing/components/task-layout.component.mock'),
    children: [],
  },
];

const BASE_URL = environment.BASE_URL;

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userService: UserService;
  let userLoginSpy: jasmine.Spy;
  let router: Router;
  let routerSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        ModalUserFeedbackComponentMock,
        RouterLink,
        LoginComponent,
      ],
      providers: [
        FormService,
        {
          provide: UserService,
          useClass: UserServiceMock,
        },
        {
          provide: TranslateService,
          useClass: TranslateServiceMock,
        },

        provideRouter(mockedRoutes),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    })
      .overrideComponent(LoginComponent, {
        remove: {
          imports: [TranslateModule],
        },
        add: {
          imports: [TranslatePipeMock],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    userService = TestBed.inject(UserService);

    userLoginSpy = spyOn(userService, 'login').and.callThrough();
    userLoginSpy.calls.reset();

    router = TestBed.inject(Router);
    routerSpy = spyOn(router, 'navigateByUrl');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('- submitLogin', () => {
    const defaultFormValue = {
      email: 'jhonDoe@gmail.com',
      password: '123456',
    };

    it('should not navigate to tasks route if form is not filled', () => {
      component.loginForm.patchValue({
        email: null,
        password: null,
      });
      component.loginForm.updateValueAndValidity();
      component.submitLogin();
      expect(component.loginForm.invalid).toBeTruthy();
      expect(routerSpy).not.toHaveBeenCalledWith('/tasks');
    });

    it('should call to user if form is correct', () => {
      component.loginForm.patchValue(defaultFormValue);
      component.loginForm.updateValueAndValidity();

      const userLogin = component.loginForm.value;
      component.submitLogin();
      expect(userLoginSpy).toHaveBeenCalledWith(userLogin);
    });

    it('should return an error if login endpoint is returned', () => {
      component.loginForm.patchValue(defaultFormValue);
      component.loginForm.updateValueAndValidity();

      const simulatedError = new HttpErrorResponse({
        error: 'Server error',
        status: 500,
        statusText: 'Internal Server Error',
        url: `${BASE_URL}/users/login`,
      });

      const fakeHttpRequest$ = throwError(() => simulatedError);
      userLoginSpy.and.returnValue(fakeHttpRequest$);

      try {
        component.submitLogin();
      } catch (error) {
        expect(error).toBeTruthy();
      }
    });

    it('should redirect to tasks if form is valid and token is retrieved', () => {
      component.loginForm.patchValue(defaultFormValue);
      component.loginForm.updateValueAndValidity();

      component.submitLogin();
      expect(routerSpy).toHaveBeenCalledWith('/tasks');
    });
  });
});
