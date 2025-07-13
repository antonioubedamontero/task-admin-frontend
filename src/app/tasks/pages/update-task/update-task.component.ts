import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  effect,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { rxResource } from '@angular/core/rxjs-interop';

import { map } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { FormatDateService, HeaderService, TaskService } from '../../services';
import { MessageService } from '../../../shared/services';
import { TaskResponseItem } from '../../interfaces';
import { TaskLogSectionComponent } from '../../components/task-log-section/task-log-section.component';

@Component({
  selector: 'app-update-tasks',
  imports: [TranslateModule, ReactiveFormsModule, TaskLogSectionComponent],
  templateUrl: './update-task.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UpdateTasksComponent {
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
      this.setFormValue(taskDetailsData);
    }
  });

  taskDetailsForm = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    currentState: ['', [Validators.required]],
    currentStateTranslated: [''],
    justification: ['', [Validators.required]],
    startDate: [''],
    startTime: [''],
    dueDate: [''],
    dueTime: [''],
  });

  constructor() {
    const headerTitle = this.translate.instant('updateTask.title');
    this.headerService.setTitle(headerTitle);
    this.headerService.showBackBtn = true;
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
        ? this.formatDateService.getDateFromDate(startDate)
        : '',
      startTime: startDate
        ? this.formatDateService.getTimeFromDate(startDate)
        : '',
      dueDate: dueDate ? this.formatDateService.getDateFromDate(dueDate) : '',
      dueTime: dueDate ? this.formatDateService.getTimeFromDate(dueDate) : '',
    });
  }

  resetForm(): void {
    // TODO: Pending implementation
  }

  updateTask(): void {
    if (this.taskDetailsForm.invalid) {
      this.taskDetailsForm.markAllAsTouched();
    }

    this.messageService.isModalShown.set(false);
    // TODO: Call endpoints to update values
    this.router.navigateByUrl('/tasks');
  }
}
