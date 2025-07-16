import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  effect,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { rxResource } from '@angular/core/rxjs-interop';

import { map } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';

import { FormatDateService, HeaderService, TaskService } from '../../services';
import { MessageService } from '../../../shared/services';
import { TaskResponseItem, TaskState } from '../../interfaces';
import { TaskLogSectionComponent } from '../../components/task-log-section/task-log-section.component';

@Component({
  selector: 'app-task-details',
  imports: [
    TranslateModule,
    ReactiveFormsModule,
    LucideAngularModule,
    TaskLogSectionComponent,
  ],
  templateUrl: './task-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TaskDetailsComponent {
  translate = inject(TranslateService);
  headerService = inject(HeaderService);
  taskService = inject(TaskService);
  messageService = inject(MessageService);
  fb = inject(FormBuilder);
  router = inject(Router);
  destroyRef = inject(DestroyRef);
  route = inject(ActivatedRoute);

  formatDateService = inject(FormatDateService);

  taskDetailsResource = rxResource({
    params: () => ({ id: this.route.snapshot.paramMap.get('id') ?? '' }),
    stream: ({ params }) =>
      this.taskService.getTaskById(params.id).pipe(map((resp) => resp.task)),
  });
  taskDetailValue = computed(() => this.taskDetailsResource.value());

  setFormDataEffect = effect(() => {
    const taskDetailsData = this.taskDetailValue();
    if (taskDetailsData) {
      this.setTitle(taskDetailsData.name);
      this.setFormValue(taskDetailsData);
    }
  });

  taskDetailsForm = this.fb.group({
    name: [''],
    description: [''],
    currentState: [TaskState.CREATED],
    currentStateTranslated: [''],
    startDate: [''],
    startTime: [''],
    dueDate: [''],
    dueTime: [''],
  });

  constructor() {
    this.setHeaderTitle();
  }

  private setHeaderTitle(): void {
    this.headerService.showBackBtn = true;
    this.setTitle('');
  }

  private setTitle(taskName: string): void {
    const headerTitle = this.translate.instant('taskDetails.title', {
      taskName,
    });
    this.headerService.setTitle(headerTitle);
  }

  setFormValue(taskDetailData: TaskResponseItem): void {
    const { name, description, currentState, startDate, dueDate } =
      taskDetailData;

    this.taskDetailsForm.patchValue({
      name,
      description,
      currentState,
      currentStateTranslated: this.translate.instant(
        `taskStates.${currentState}`
      ),
      startDate: startDate
        ? this.formatDateService.getDateFromIsoString(startDate)
        : '',
      startTime: startDate
        ? this.formatDateService.getTimeFromIsoString(startDate)
        : '',
      dueDate: dueDate
        ? this.formatDateService.getDateFromIsoString(dueDate)
        : '',
      dueTime: dueDate
        ? this.formatDateService.getTimeFromIsoString(dueDate)
        : '',
    });
  }

  closeModal(): void {
    this.messageService.isModalShown.set(false);
    this.router.navigateByUrl('/tasks');
  }
}
