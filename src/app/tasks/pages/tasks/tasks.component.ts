import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

import { catchError, map, of } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';

import { AuthService } from '../../../auth/services';
import { MiniTaskItem, TaskResponseItem, TaskState } from '../../interfaces';
import { MiniTaskByCategoryComponent } from '../../components/mini-task-by-category/mini-task-by-category.component';
import { HeaderService, TaskService } from '../../services';

@Component({
  selector: 'app-tasks',
  imports: [TranslateModule, MiniTaskByCategoryComponent, LucideAngularModule],
  templateUrl: './tasks.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TasksComponent implements OnInit {
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

  createdTaskItems = signal<MiniTaskItem[]>([]);
  startedTaskItems = signal<MiniTaskItem[]>([]);
  pausedTaskItems = signal<MiniTaskItem[]>([]);
  canceledTaskItems = signal<MiniTaskItem[]>([]);
  endedTaskItems = signal<MiniTaskItem[]>([]);

  ngOnInit(): void {
    this.headerService.setTitle(this.headerTitle());
    this.headerService.showBackBtn = false;
    this.reloadTasks();
  }

  reloadTasks(): void {
    this.loadTaskByStateFromApi(TaskState.CREATED).subscribe((tasks) =>
      this.createdTaskItems.set(tasks)
    );

    this.loadTaskByStateFromApi(TaskState.STARTED).subscribe((tasks) =>
      this.startedTaskItems.set(tasks)
    );

    this.loadTaskByStateFromApi(TaskState.PAUSED).subscribe((tasks) =>
      this.pausedTaskItems.set(tasks)
    );

    this.loadTaskByStateFromApi(TaskState.CANCELED).subscribe((tasks) =>
      this.canceledTaskItems.set(tasks)
    );

    this.loadTaskByStateFromApi(TaskState.ENDED).subscribe((tasks) =>
      this.endedTaskItems.set(tasks)
    );
  }

  loadTaskByStateFromApi(state: TaskState) {
    return this.taskService.getTasksByState(state).pipe(
      map(({ tasks }) => this.mapTasksToMiniTask(tasks)),
      catchError((error) => {
        console.error(`error retrieving ${state} tasks`, error);
        return of([]);
      }),
      takeUntilDestroyed(this.destroyRef)
    );
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
