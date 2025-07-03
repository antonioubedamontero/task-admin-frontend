import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';

import { MiniTaskItem, TaskState } from '../../interfaces';
import { MiniTaskComponent } from '../mini-task/mini-task.component';

@Component({
  selector: 'app-mini-task-by-category',
  imports: [TranslateModule, MiniTaskComponent],
  templateUrl: './mini-task-by-category.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiniTaskByCategoryComponent {
  title = input.required<string>();
  state = input.required<TaskState>();
  taskItems = input.required<MiniTaskItem[]>();
}
