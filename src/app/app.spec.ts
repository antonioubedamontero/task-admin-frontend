import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter, Router, RouterOutlet, Routes } from '@angular/router';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { App } from './app';
import { httpLoaderFactory } from './app.config';
import { LanguageService } from './auth/services/language.service';
import { LanguageServiceMock } from '../../testing/services';
import { routes } from './app.routes';

describe('App', () => {
  let fixture: ComponentFixture<App>;
  let app: App;
  let languageService: LanguageService;
  let languageServiceSpy: jasmine.Spy;
  let mockedRoutes: Routes;
  let router: Router;

  beforeEach(async () => {
    mockedRoutes = routes.map((route) => {
      const { path } = route;
      if (path === 'auth') {
        return {
          path,
          loadComponent: () =>
            import('../../testing/components/auth-layout.component.mock'),
          children: [],
        };
      }

      if (path === 'tasks') {
        return {
          path,
          loadComponent: () =>
            import('../../testing/components/task-layout.component.mock'),
          children: [],
        };
      }

      return route;
    });

    await TestBed.configureTestingModule({
      imports: [App, RouterOutlet],
      providers: [
        importProvidersFrom([
          TranslateModule.forRoot({
            loader: {
              provide: TranslateLoader,
              useFactory: httpLoaderFactory,
              deps: [HttpClient],
            },
          }),
        ]),
        {
          provide: LanguageService,
          useClass: LanguageServiceMock,
        },
        provideRouter(mockedRoutes),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    languageService = TestBed.inject(LanguageService);
    router = TestBed.inject(Router);
    languageServiceSpy = spyOn(languageService, 'initializeLanguages');

    fixture = TestBed.createComponent(App);
    app = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should initialize and load current language', () => {
    expect(languageServiceSpy).toHaveBeenCalled();
  });

  it('should render router', () => {
    const htmlRouter = fixture.nativeElement.querySelector('router-outlet');
    expect(htmlRouter).toBeTruthy();
  });

  describe('should navigate to routes', () => {
    it('should navigate to auth routes', (done) => {
      router.navigateByUrl('/auth').then((successNavigation) => {
        fixture.detectChanges();
        const htmlAuthLayout =
          fixture.nativeElement.querySelector('div#auth-layout');
        expect(htmlAuthLayout).toBeTruthy();
        done();
      });
    });

    it('should navigate to tasks routes', (done) => {
      router.navigateByUrl('/tasks').then((successNavigation) => {
        fixture.detectChanges();
        const htmlTasksLayout =
          fixture.nativeElement.querySelector('div#tasks-layout');
        expect(htmlTasksLayout).toBeTruthy();
        done();
      });
    });
  });
});
