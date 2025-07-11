import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { HeaderService } from '../../services';

@Component({
  selector: 'app-task-details',
  imports: [TranslateModule],
  templateUrl: './task-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TaskDetailsComponent {
  translate = inject(TranslateService);
  headerService = inject(HeaderService);

  constructor() {
    const headerTitle = this.translate.instant('taskDetails.title');
    this.headerService.setTitle(headerTitle);
    this.headerService.showBackBtn = true;
  }
}
