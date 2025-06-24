import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-tasks-by-state',
  imports: [],
  templateUrl: './tasks-by-state.component.html',
  styleUrl: './tasks-by-state.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TasksByStateComponent { }
