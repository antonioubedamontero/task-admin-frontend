import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../auth/services';
import { BehaviorSubject, Subscription } from 'rxjs';
import { LucideAngularModule } from 'lucide-angular';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

export const headerTitle$ = new BehaviorSubject('');

@Component({
  selector: 'app-header',
  imports: [TranslateModule, LucideAngularModule],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  headerTitle = toSignal(headerTitle$);

  authService = inject(AuthService);
  router = inject(Router);

  subscriptions: Subscription[] = [];

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/auth/login');
  }
}
