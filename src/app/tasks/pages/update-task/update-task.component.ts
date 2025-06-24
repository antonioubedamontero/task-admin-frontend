import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-update-task',
  imports: [],
  templateUrl: './update-task.component.html',
  styleUrl: './update-task.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UpdateTaskComponent { }
