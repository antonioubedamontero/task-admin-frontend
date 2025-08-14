import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { MiniTaskItem, TaskState } from '../../src/app/tasks/interfaces';

@Component({
  selector: 'app-mini-task-by-category',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiniTaskByCategoryComponentMock {
  title = input.required<string>();
  icon = input.required<string>();
  state = input.required<TaskState>();
  taskItems = input.required<MiniTaskItem[]>();

  reloadTasks = output<boolean>();
}
