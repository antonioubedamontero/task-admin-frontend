import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
} from '@angular/core';

import { rxResource, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { catchError, map, of } from 'rxjs';

import { headerTitle$ } from '../../components/header/header.component';
import { AuthService } from '../../../auth/services';
import { MiniTaskItem, TaskResponseItem, TaskState } from '../../interfaces';
import { MiniTaskByCategoryComponent } from '../../components/mini-task-by-category/mini-task-by-category.component';
import { TaskService } from '../../services';

@Component({
  selector: 'app-tasks',
  imports: [TranslateModule, MiniTaskByCategoryComponent],
  templateUrl: './tasks.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TasksComponent {
  translate = inject(TranslateService);
  authService = inject(AuthService);
  taskService = inject(TaskService);
  private destroyRef = inject(DestroyRef);

  readonly taskState = TaskState;
  private headerTitle = computed(() => {
    return this.translate.instant('tasks.title', {
      name: this.authService.nameAndSurname(),
    });
  });

  createdTaskResouce = rxResource({
    params: () => TaskState.CREATED,
    stream: ({ params: state }) =>
      this.taskService.getTasksByState(state).pipe(
        map(({ tasks }) => this.mapTasksToMiniTask(tasks)),
        catchError((error) => {
          // TODO: Show dialog error message
          return of([]);
        })
      ),
  });

  startedTaskResouce = rxResource({
    params: () => TaskState.STARTED,
    stream: ({ params: state }) =>
      this.taskService.getTasksByState(state).pipe(
        map(({ tasks }) => this.mapTasksToMiniTask(tasks)),
        catchError((error) => {
          // TODO: Show dialog error message
          return of([]);
        })
      ),
  });

  pausedTaskResouce = rxResource({
    params: () => TaskState.PAUSED,
    stream: ({ params: state }) =>
      this.taskService.getTasksByState(state).pipe(
        map(({ tasks }) => this.mapTasksToMiniTask(tasks)),
        catchError((error) => {
          // TODO: Show dialog error message
          return of([]);
        })
      ),
  });

  canceledTaskResouce = rxResource({
    params: () => TaskState.CANCELED,
    stream: ({ params: state }) =>
      this.taskService.getTasksByState(state).pipe(
        map(({ tasks }) => this.mapTasksToMiniTask(tasks)),
        catchError((error) => {
          // TODO: Show dialog error message
          return of([]);
        })
      ),
  });

  endedTaskResouce = rxResource({
    params: () => TaskState.ENDED,
    stream: ({ params: state }) =>
      this.taskService.getTasksByState(state).pipe(
        takeUntilDestroyed(this.destroyRef),
        map(({ tasks }) => this.mapTasksToMiniTask(tasks)),
        catchError((error) => {
          // TODO: Show dialog error message
          return of([]);
        })
      ),
  });

  constructor() {
    headerTitle$.next(this.headerTitle());
  }

  private mapTasksToMiniTask(tasks: TaskResponseItem[]): MiniTaskItem[] {
    return tasks.map((task: TaskResponseItem) => {
      const mappedTask: MiniTaskItem = {
        title: task.name,
      };
      if (task.startDate) {
        mappedTask.startDate = task.startDate;
      }

      if (task.dueDate) {
        mappedTask.dueDate = task.dueDate;
      }
      return mappedTask;
    });
  }
}
