import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  private _title = signal<string>('');
  private _showBack = signal<boolean>(false);
  private _location = inject(Location);
  private _router = inject(Router);

  get title(): Signal<string> {
    return computed(() => this._title());
  }

  setTitle(title: string): void {
    this._title.set(title);
  }

  get isBackBtnShow(): boolean {
    return this._showBack();
  }

  set showBackBtn(showBtn: boolean) {
    this._showBack.set(showBtn);
  }

  navigateBack() {
    if (window.history.length > 1) {
      this._location.back();
    } else {
      this._router.navigateByUrl('/tasks');
    }
  }
}
