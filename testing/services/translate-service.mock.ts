import { Injectable } from '@angular/core';
import { AVAILABLE_LANGS, DEFAULT_LANG } from '../../src/app/available-langs';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslateServiceMock {
  instant(key: string): string {
    return `mock translation ${key}`;
  }

  get langs(): string[] {
    return [...AVAILABLE_LANGS];
  }

  addLangs(langs: string[]): void {
    return;
  }

  setDefaultLang(lang: string) {
    return;
  }

  getDefaultLang(): string {
    return DEFAULT_LANG;
  }

  getBrowserLang(): string | undefined {
    return DEFAULT_LANG;
  }

  get currentLang(): string {
    return DEFAULT_LANG;
  }

  set currentLang(currentLang: string) {
    return;
  }

  use(lang: string): Observable<string> {
    return of(lang);
  }
}
