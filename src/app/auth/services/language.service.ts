import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { AVAILABLE_LANGS, DEFAULT_LANG } from '../../available-langs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  translate = inject(TranslateService);

  initializeLanguages(): void {
    this.translate.addLangs([...AVAILABLE_LANGS]);
    this.translate.setDefaultLang(DEFAULT_LANG);
    this.translate.use(DEFAULT_LANG);
  }

  changeLanguage(lang: string): void {
    if (!AVAILABLE_LANGS.includes(lang)) {
      return;
    }

    this.translate.use(lang);
  }

  get currentLang(): string {
    return this.translate.currentLang;
  }

  get browserLang(): string {
    return this.translate.getBrowserLang() ?? '';
  }
}
