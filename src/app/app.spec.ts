import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { importProvidersFrom } from '@angular/core';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { App } from './app';
import { httpLoaderFactory } from './app.config';

import { LanguageService } from './auth/services/language.service';
import { LanguageServiceMock } from './testing/services';

describe('App', () => {
  let fixture: ComponentFixture<App>;
  let app: App;
  let languageService: LanguageService;
  let languageServiceSpy: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
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
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    languageService = TestBed.inject(LanguageService);
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
});
