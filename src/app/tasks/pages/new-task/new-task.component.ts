import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HeaderService } from '../../services';
@Component({
  selector: 'app-new-task',
  imports: [TranslateModule],
  templateUrl: './new-task.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NewTaskComponent {
  translate = inject(TranslateService);
  headerService = inject(HeaderService);

  constructor() {
    const headerTitle = this.translate.instant('newTask.title');
    this.headerService.setTitle(headerTitle);
    this.headerService.showBackBtn = true;
  }
}
