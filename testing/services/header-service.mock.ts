import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HeaderServiceMock {
  get title(): Signal<string> {
    return signal('mock title');
  }

  setTitle(title: string): void {}

  get isBackBtnShow(): boolean {
    return true;
  }

  set showBackBtn(showBtn: boolean) {}

  navigateBack() {}
}
