import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TranslateServiceMock {
  instant(key: string): string {
    return `mock translation ${key}`;
  }
}
