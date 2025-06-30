import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { headerTitle$ } from '../../components/header/header.component';
import { AuthService } from '../../../auth/services';

@Component({
  selector: 'app-tasks',
  imports: [TranslateModule],
  templateUrl: './tasks.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TasksComponent {
  translate = inject(TranslateService);
  authService = inject(AuthService);

  ngOnInit(): void {
    // TODO: Try to avoid this life cycle
    const headerTitle = this.translate.instant('tasks.title', {
      name: this.authService.nameAndSurname(),
    });
    headerTitle$.next(headerTitle);
  }
}
