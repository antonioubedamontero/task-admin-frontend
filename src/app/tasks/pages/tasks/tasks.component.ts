import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-tasks',
  imports: [],
  templateUrl: './tasks.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TasksComponent {}
