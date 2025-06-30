import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../auth/services';
import { BehaviorSubject, Subscription } from 'rxjs';
import { LucideAngularModule } from 'lucide-angular';
import { Router } from '@angular/router';

export const headerTitle$ = new BehaviorSubject('');

@Component({
  selector: 'app-header',
  imports: [TranslateModule, LucideAngularModule],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  headerTitle = signal<string>('');

  authService = inject(AuthService);
  router = inject(Router);

  subscriptions: Subscription[] = [];

  ngOnInit(): void {
    // TODO: Try to avoid onInit
    const subscriptions = headerTitle$.subscribe((title) =>
      this.headerTitle.set(title)
    );
    this.subscriptions.push(subscriptions);
  }

  ngOnDestroy(): void {
    // TODO: Try to avoid onInit
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/auth/login');
  }
}
