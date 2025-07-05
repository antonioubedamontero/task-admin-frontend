import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { LanguageService } from './auth/services/language.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TranslateModule],
  templateUrl: './app.html',
})
export class App {
  language = inject(LanguageService);

  constructor() {
    this.configureLangs();
  }

  private configureLangs(): void {
    this.language.initializeLanguages();
    const browserLang = this.language.browserLang;
    this.language.changeLanguage(browserLang);
  }
}
