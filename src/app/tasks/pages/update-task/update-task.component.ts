import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { headerTitle$ } from '../../components/header/header.component';

@Component({
  selector: 'app-update-task',
  imports: [TranslateModule],
  templateUrl: './update-task.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UpdateTaskComponent {
  translate = inject(TranslateService);

  constructor() {
    const headerTitle = this.translate.instant('updateTask.title');
    headerTitle$.next(headerTitle);
  }
}
