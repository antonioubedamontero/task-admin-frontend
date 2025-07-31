import { computed, inject, Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class LanguageServiceMock {
  translate = inject(TranslateService);

  private _currentLanguage = signal<string>('es');
  currentLang = computed(() => this._currentLanguage());

  initializeLanguages() {
    const browserLang = this.translate.getBrowserLang() ?? '';
    let currentLang = 'es';
    this._currentLanguage.set(currentLang);

    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('es');
    this.translate.use(currentLang);
  }
}
