import { computed, inject, Injectable, signal } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { AVAILABLE_LANGS, DEFAULT_LANG } from '../../available-langs';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  translate = inject(TranslateService);

  private _currentLanguage = signal<string>(DEFAULT_LANG);
  currentLang = computed(() => this._currentLanguage());

  initializeLanguages() {
    const browserLang = this.translate.getBrowserLang() ?? '';
    let currentLang = DEFAULT_LANG;

    if (AVAILABLE_LANGS.includes(browserLang)) {
      currentLang = browserLang;
    }
    this._currentLanguage.set(currentLang);

    this.translate.addLangs([...AVAILABLE_LANGS]);
    this.translate.setDefaultLang(DEFAULT_LANG);
    this.translate.use(currentLang);
  }
}
