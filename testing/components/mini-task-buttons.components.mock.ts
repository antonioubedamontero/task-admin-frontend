import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { MiniTaskType } from '../../src/app/tasks/interfaces';

@Component({
  selector: 'app-mini-task-buttons',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiniTaskButtonsComponentMock {
  btnClicked = output<MiniTaskType>();
}
