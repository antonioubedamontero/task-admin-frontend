import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { AVAILABLE_LANGS, DEFAULT_LANG } from './available-langs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TranslateModule],
  templateUrl: './app.html',
})
export class App {
  protected title = 'Task Admin';

  translate = inject(TranslateService);

  constructor() {
    this.configureLangs();
  }

  private configureLangs(): void {
    // Add available langs and configure languages
    this.translate.addLangs([...AVAILABLE_LANGS]);
    this.translate.setDefaultLang(DEFAULT_LANG);
    this.translate.use(DEFAULT_LANG);

    // Update language translations with browser lang if available
    const browserLang = this.translate.getBrowserLang();
    if (browserLang && AVAILABLE_LANGS.includes(browserLang)) {
      this.translate.use(browserLang);
    }
  }
}
