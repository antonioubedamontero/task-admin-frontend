import { Injectable } from '@angular/core';

type LocalStorageData = {
  [key: string]: string;
};

@Injectable({ providedIn: 'root' })
export class LocalStorageMock {
  data: LocalStorageData = {};

  getItem(key: string): string | null {
    if (this.data.hasOwnProperty(key)) {
      return this.data[key as keyof LocalStorageData];
    }
    return null;
  }

  setItem(key: string, value: string): void {
    this.data[key] = value;
  }

  clear(): void {
    this.data = {};
  }
}
