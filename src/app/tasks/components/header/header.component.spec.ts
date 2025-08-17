import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ArrowLeft, LogOut, LucideAngularModule } from 'lucide-angular';

import { HeaderComponent } from './header.component';
import {
  AuthServiceMock,
  TranslateServiceMock,
} from '../../../../../testing/services';
import AuthLayoutMockComponent from '../../../../../testing/components/auth-layout.component.mock';
import { HeaderServiceMock } from '../../../../../testing/services';
import { HeaderService } from '../../services';
import { AuthService } from '../../../auth/services';
import { TranslatePipeMock } from '../../../../../testing/pipes';
import { importProvidersFrom } from '@angular/core';

const lucideIcons = {
  ArrowLeft,
  LogOut,
};

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let routerSpy: jasmine.Spy;
  let authServiceLogoutSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, LucideAngularModule],
      providers: [
        provideRouter([
          { path: 'auth/login', component: AuthLayoutMockComponent },
        ]),
        importProvidersFrom(LucideAngularModule.pick({ ...lucideIcons })),
        { provide: AuthService, useClass: AuthServiceMock },
        { provide: HeaderService, useClass: HeaderServiceMock },
        { provide: TranslateService, useClass: TranslateServiceMock },
      ],
    })
      .overrideComponent(HeaderComponent, {
        remove: {
          imports: [TranslateModule],
        },
        add: {
          imports: [TranslatePipeMock],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);

    component = fixture.componentInstance;

    routerSpy = spyOn(component.router, 'navigateByUrl').and.callThrough();
    authServiceLogoutSpy = spyOn(
      component.authService,
      'logout'
    ).and.callThrough();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show header title', () => {
    expect(component.headerService.title()).toBe('mock title');
  });

  it('should logout header service method and navigate to auth/login', () => {
    component.logout();

    expect(authServiceLogoutSpy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith('/auth/login');
  });

  it('should render a header title', () => {
    const h1Html: HTMLHeadingElement =
      fixture.nativeElement.querySelector('h1');
    expect(h1Html.innerHTML.trim()).toBe('mock title');
  });

  it('should have a back button', () => {
    const backHtmlButton: HTMLButtonElement =
      fixture.nativeElement.querySelector('button#backButton');
    expect(backHtmlButton).toBeTruthy();
  });

  it('should have a logount button', () => {
    const logoutHtmlButton: HTMLButtonElement =
      fixture.nativeElement.querySelector('button#logoutButton');
    expect(logoutHtmlButton).toBeTruthy();
  });
});
