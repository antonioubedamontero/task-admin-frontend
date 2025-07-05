import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HeaderService } from '../../services';

@Component({
  selector: 'app-update-task',
  imports: [TranslateModule],
  templateUrl: './update-task.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UpdateTaskComponent {
  translate = inject(TranslateService);
  headerService = inject(HeaderService);

  constructor() {
    const headerTitle = this.translate.instant('updateTask.title');
    this.headerService.setTitle(headerTitle);
    this.headerService.showBackBtn = true;
  }
}
