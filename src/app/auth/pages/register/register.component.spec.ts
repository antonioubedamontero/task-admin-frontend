import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter, Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { throwError } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import RegisterComponent from './register.component';
import {
  TranslateServiceMock,
  UserServiceMock,
} from '../../../../../testing/services';
import { TranslatePipeMock } from '../../../../../testing/pipes';
import { ModalUserFeedbackComponentMock } from '../../../../../testing/components';
import { UserService } from '../../services';
import { MessageService } from '../../../shared/services';
import { environment } from '../../../../environments/environment';

const BASE_URL = environment.BASE_URL;

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let registerCallSpy: jasmine.Spy;
  let router: Router;
  let routerSpy: jasmine.Spy;
  let messageServiceSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RegisterComponent,
        ReactiveFormsModule,
        RouterLink,
        ModalUserFeedbackComponentMock,
      ],
      providers: [
        provideRouter([
          {
            path: 'tasks',
            loadComponent: () =>
              import(
                '../../../../../testing/components/task-layout.component.mock'
              ),
            children: [],
          },
        ]),
        provideHttpClient(),
        provideHttpClientTesting(),
        MessageService,
        {
          provide: UserService,
          useClass: UserServiceMock,
        },
        {
          provide: TranslateService,
          useClass: TranslateServiceMock,
        },
      ],
    })
      .overrideComponent(RegisterComponent, {
        remove: {
          imports: [TranslateModule],
        },
        add: {
          imports: [TranslatePipeMock],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;

    router = TestBed.inject(Router);
    routerSpy = spyOn(router, 'navigateByUrl').and.callThrough();
    messageServiceSpy = spyOn(
      component.messageService,
      'showModal'
    ).and.callThrough();

    registerCallSpy = spyOn(
      component['userService'],
      'register'
    ).and.callThrough();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not call endpoint when register form is invalid', () => {
    component.registerForm.setValue({
      email: '',
      name: '',
      surname: '',
      password: '',
      repeatPassword: '',
    });
    component.registerForm.updateValueAndValidity();

    expect(component.registerForm.invalid).toBeTruthy();
    expect(registerCallSpy).not.toHaveBeenCalled();
  });

  it('should not call endpoint when register form is invalid', () => {
    component.registerForm.setValue({
      email: '',
      name: '',
      surname: '',
      password: '',
      repeatPassword: '',
    });
    component.registerForm.updateValueAndValidity();

    component.submitRegister();

    expect(component.registerForm.invalid).toBeTruthy();
    expect(registerCallSpy).not.toHaveBeenCalled();
  });

  describe('- Submit register', () => {
    beforeEach(() => {
      registerCallSpy.calls.reset();
    });

    it('should render a register form', () => {
      const htmlForm = fixture.nativeElement.querySelector('form');
      expect(htmlForm).toBeTruthy();
    });

    it('should render a email form control', () => {
      const htmlEmailForm = fixture.nativeElement.querySelector('#email');
      expect(htmlEmailForm).toBeTruthy();
    });

    it('should render a name form control', () => {
      const htmlNameForm = fixture.nativeElement.querySelector('#name');
      expect(htmlNameForm).toBeTruthy();
    });

    it('should render a surname form control', () => {
      const htmlSurnameForm = fixture.nativeElement.querySelector('#surname');
      expect(htmlSurnameForm).toBeTruthy();
    });

    it('should render a password form control', () => {
      const htmlPasswordForm = fixture.nativeElement.querySelector('#password');
      expect(htmlPasswordForm).toBeTruthy();
    });

    it('should render a repeat password form control', () => {
      const htmlRepeatPasswordForm =
        fixture.nativeElement.querySelector('#repeatPassword');
      expect(htmlRepeatPasswordForm).toBeTruthy();
    });

    it('should call register endpoint and redirect to tasks page is response is ok', () => {
      const newUser = {
        email: 'jhonDoe@gmail.com',
        name: 'Jhon',
        surname: 'Doe',
        password: '123456',
        repeatPassword: '123456',
      };
      component.registerForm.setValue(newUser);
      component.registerForm.updateValueAndValidity();

      component.submitRegister();

      expect(component.registerForm.valid).toBeTruthy();

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { repeatPassword, ...sentNewUser } = newUser;
      expect(registerCallSpy).toHaveBeenCalledWith(sentNewUser);
      expect(routerSpy).toHaveBeenCalledWith('/tasks');
    });

    it('should not navigate to tasks page if and error is thrown', () => {
      const newUser = {
        email: 'jhonDoe@gmail.com',
        name: 'Jhon',
        surname: 'Doe',
        password: '123456',
        repeatPassword: '123456',
      };
      component.registerForm.setValue(newUser);
      component.registerForm.updateValueAndValidity();

      const simulatedError = new HttpErrorResponse({
        error: 'Server error',
        status: 500,
        statusText: 'Internal Server Error',
        url: `${BASE_URL}/users/register`,
      });
      const fakeHttpRequest$ = throwError(() => simulatedError);
      registerCallSpy.and.returnValue(fakeHttpRequest$);

      component.submitRegister();
      expect(routerSpy).not.toHaveBeenCalledWith('/tasks');
      expect(messageServiceSpy).toHaveBeenCalled();
    });
  });
});
