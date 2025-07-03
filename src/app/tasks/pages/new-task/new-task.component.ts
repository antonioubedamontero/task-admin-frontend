import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { headerTitle$ } from '../../components/header/header.component';

@Component({
  selector: 'app-new-task',
  imports: [TranslateModule],
  templateUrl: './new-task.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NewTaskComponent {
  translate = inject(TranslateService);

  constructor() {
    const headerTitle = this.translate.instant('newTask.title');
    headerTitle$.next(headerTitle);
  }
}
