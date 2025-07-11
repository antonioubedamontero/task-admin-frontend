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

import { AuthService } from '../../../auth/services';
import { MiniTaskItem, TaskResponseItem, TaskState } from '../../interfaces';
import { MiniTaskByCategoryComponent } from '../../components/mini-task-by-category/mini-task-by-category.component';
import { HeaderService, TaskService } from '../../services';
import { LucideAngularModule } from 'lucide-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  imports: [TranslateModule, MiniTaskByCategoryComponent, LucideAngularModule],
  templateUrl: './tasks.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TasksComponent {
  translate = inject(TranslateService);
  authService = inject(AuthService);
  taskService = inject(TaskService);
  headerService = inject(HeaderService);
  router = inject(Router);
  destroyRef = inject(DestroyRef);

  readonly taskState = TaskState;
  private headerTitle = computed(() => {
    return this.translate.instant('tasks.title', {
      name: this.authService.nameAndSurname(),
    });
  });

  createdTaskItems = computed(() => this.createdTaskResouce.value() ?? []);
  startedTaskItems = computed(() => this.startedTaskResouce.value() ?? []);
  pausedTaskItems = computed(() => this.pausedTaskResouce.value() ?? []);
  canceledTaskItems = computed(() => this.canceledTaskResouce.value() ?? []);
  endedTaskItems = computed(() => this.endedTaskResouce.value() ?? []);

  createdTaskResouce = rxResource({
    params: () => TaskState.CREATED,
    stream: ({ params: state }) =>
      this.taskService.getTasksByState(state).pipe(
        map(({ tasks }) => this.mapTasksToMiniTask(tasks)),
        catchError((error) => {
          console.error('error retrieving created tasks', error);
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
          console.error('error retrieving started tasks', error);
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
          console.error('error retrieving paused tasks', error);
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
          console.error('error retrieving canceled tasks', error);
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
          console.error('error retrieving ended tasks', error);
          return of([]);
        })
      ),
  });

  constructor() {
    this.headerService.setTitle(this.headerTitle());
    this.headerService.showBackBtn = false;
  }

  addTask(): void {
    this.router.navigateByUrl('/tasks/new');
  }

  private mapTasksToMiniTask(tasks: TaskResponseItem[]): MiniTaskItem[] {
    return tasks.map((task: TaskResponseItem) => {
      const mappedTask: MiniTaskItem = {
        _id: task._id,
        title: task.name,
        description: task.description,
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
