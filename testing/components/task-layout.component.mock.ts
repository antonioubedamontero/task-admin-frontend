import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-tasks-layout',
  template: `<div id="tasks-layout"></div> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TasksLayoutMockComponent {}
