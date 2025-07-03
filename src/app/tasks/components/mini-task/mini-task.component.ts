import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';
import moment from 'moment';

import { MiniTaskButtonsComponent } from './mini-task-buttons/mini-task-buttons.component';
import { MiniTaskItem } from '../../interfaces';

@Component({
  selector: 'app-mini-task',
  imports: [MiniTaskButtonsComponent, TranslateModule],
  templateUrl: './mini-task.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiniTaskComponent {
  taskItem = input.required<MiniTaskItem>();

  formatDate(dateString?: string): string {
    if (!dateString) return 'N/A';
    return moment(dateString).format('DD-MM-YYYY HH:mm');
  }
}
