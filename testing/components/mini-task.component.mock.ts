import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

import { MiniTaskItem, MiniTaskType } from '../../src/app/tasks/interfaces';

@Component({
  selector: 'app-mini-task',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiniTaskComponentMock {
  taskItem = input.required<MiniTaskItem>();
  reloadTasks = output<boolean>();

  manageClickedBtn(btnAction: MiniTaskType): void {}

  getFormatDateFromIsoDate(isoDate?: string): string {
    if (!isoDate) return 'N/A';
    return new Date(isoDate).toISOString();
  }

  closeModal() {}
}
