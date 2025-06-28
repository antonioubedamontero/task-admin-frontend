import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { LanguageService } from './auth/services/language.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
})
export class App {
  protected title = 'Task Admin';

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
