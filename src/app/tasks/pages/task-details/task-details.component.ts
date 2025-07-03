import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { headerTitle$ } from '../../components/header/header.component';

@Component({
  selector: 'app-task-details',
  imports: [TranslateModule],
  templateUrl: './task-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TaskDetailsComponent {
  translate = inject(TranslateService);

  constructor() {
    const headerTitle = this.translate.instant('taskDetails.title');
    headerTitle$.next(headerTitle);
  }
}
