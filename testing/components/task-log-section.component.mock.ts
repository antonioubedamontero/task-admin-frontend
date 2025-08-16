import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { LogStateResponse } from '../../src/app/tasks/interfaces';

@Component({
  selector: 'app-task-log-section',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskLogSectionComponentMock {
  logStates = input<LogStateResponse[]>([]);

  toggleIsLogOpen(): void {}
}
