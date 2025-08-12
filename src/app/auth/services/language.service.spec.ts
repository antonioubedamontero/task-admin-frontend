import { TestBed } from '@angular/core/testing';

import { TranslateService } from '@ngx-translate/core';

import { LanguageService } from './language.service';
import { TranslateServiceMock } from '../../../../testing/services';
import { AVAILABLE_LANGS, DEFAULT_LANG } from '../../available-langs';

describe('LanguageService', () => {
  let service: LanguageService;
  let translateService: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: TranslateService,
          useClass: TranslateServiceMock,
        },
      ],
    });
    service = TestBed.inject(LanguageService);
    translateService = TestBed.inject(TranslateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize languages when call to initialize languages', () => {
    service.initializeLanguages();
    expect(translateService.langs).toEqual([...AVAILABLE_LANGS]);
    //expect(translateService.defaultLang).toBe(DEFAULT_LANG);
    expect(translateService.currentLang).toBe(DEFAULT_LANG);
  });
});
