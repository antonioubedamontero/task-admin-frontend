import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';

import { AuthService } from '../../../auth/services';
import { HeaderService } from '../../services';

@Component({
  selector: 'app-header',
  imports: [TranslateModule, LucideAngularModule],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  authService = inject(AuthService);
  router = inject(Router);
  headerService = inject(HeaderService);

  headerTitle = computed(() => this.headerService.title());

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/auth/login');
  }
}
