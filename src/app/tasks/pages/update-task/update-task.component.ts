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
import { rxResource, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpErrorResponse } from '@angular/common/http';

import { map } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';

import { FormatDateService, HeaderService, TaskService } from '../../services';
import { MessageService } from '../../../shared/services';
import {
  availableTaskStates,
  TaskResponseItem,
  UpdateTaskRequest,
} from '../../interfaces';
import { TaskLogSectionComponent } from '../../components/task-log-section/task-log-section.component';
import { ModelUserFeedbackType } from '../../../shared/interfaces';
import { ModalUserFeedbackComponent } from '../../../shared/components/modal-user-feedback/modal-user-feedback.component';
import { TaskStatePipe } from '../../pipes/task-state.pipe';

@Component({
  selector: 'app-update-tasks',
  imports: [
    TranslateModule,
    ReactiveFormsModule,
    LucideAngularModule,
    TaskLogSectionComponent,
    ModalUserFeedbackComponent,
    TaskStatePipe,
  ],
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
      this.setTitle(taskDetailsData.name);
      this.setFormValue(taskDetailsData);
    }
  });

  taskDetailsForm = this.fb.group({
    _id: [''],
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    currentState: ['', [Validators.required]],
    justification: ['', [Validators.required]],
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
    const headerTitle = this.translate.instant('updateTask.title', {
      taskName,
    });
    this.headerService.setTitle(headerTitle);
  }

  setFormValue(taskDetailData: TaskResponseItem): void {
    const { _id, name, description, currentState, startDate, dueDate } =
      taskDetailData;

    this.taskDetailsForm.patchValue({
      _id,
      name,
      description,
      currentState,
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
    const {
      _id,
      name,
      description,
      currentState,
      startDate: dateFrom,
      dueDate: dateTo,
    } = this.taskDetailValue()!;

    const initialFormValue = {
      _id,
      name,
      description,
      currentState,
      justification: '',
    };

    this.taskDetailsForm.setValue({
      ...initialFormValue,
      startDate: dateFrom
        ? this.formatDateService.getDateFromDate(dateFrom)
        : null,
      startTime: dateFrom
        ? this.formatDateService.getTimeFromDate(dateFrom)
        : null,
      dueDate: dateTo ? this.formatDateService.getDateFromDate(dateTo) : null,
      dueTime: dateTo ? this.formatDateService.getTimeFromDate(dateTo) : null,
    });
  }

  sendForm(): void {
    if (this.taskDetailsForm.invalid) {
      this.taskDetailsForm.markAllAsTouched();
    }

    const updateTaskReq = this.mapDataToUpdateTaskRequest(
      this.taskDetailsForm.value
    );

    this.updateTask(updateTaskReq);
  }

  private updateTask(updateTaskReq: UpdateTaskRequest): void {
    this.taskService
      .updateTask(updateTaskReq)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: async () => {
          const title = this.translate.instant(
            'modalUserFeedback.defaultSuccessTitle.updateTask'
          );
          const message = this.translate.instant(
            'modalUserFeedback.defaultSuccessMessage'
          );
          this.messageService.showModal(
            title,
            message,
            ModelUserFeedbackType.success
          );
        },
        error: (errorResponse: HttpErrorResponse) => {
          const title = this.translate.instant(
            'modalUserFeedback.defaultErrorTitle'
          );
          const message = errorResponse.error.message;
          this.messageService.showModal(
            title,
            message,
            ModelUserFeedbackType.ERROR
          );
        },
      });
  }

  private mapDataToUpdateTaskRequest(rawFormData: any): UpdateTaskRequest {
    const cleanData: Partial<UpdateTaskRequest> = {};
    const { startDate, startTime, dueDate, dueTime, _id, ...data } =
      rawFormData;

    data.taskId = _id;

    Object.keys(data).forEach((formKey) => {
      if (formKey) {
        cleanData[formKey as keyof UpdateTaskRequest] = data[formKey];
      }
    });

    if (this.isValidDate(startDate) && this.isValidTime(startTime)) {
      cleanData.startDate = this.formatDateService.getDateFromDateTime(
        startDate,
        startTime
      );
    }

    if (this.isValidDate(dueDate) && this.isValidTime(dueTime)) {
      cleanData.dueDate = this.formatDateService.getDateFromDateTime(
        dueDate,
        dueTime
      );
    }

    return cleanData as UpdateTaskRequest;
  }

  closeModal(): void {
    this.messageService.isModalShown.set(false);
    if (this.messageService.modalType() === ModelUserFeedbackType.success) {
      this.router.navigateByUrl('/tasks');
    }
  }

  private isValidDate(startDate: string): boolean {
    return !!startDate && startDate !== 'N/A';
  }

  private isValidTime(startTime: string): boolean {
    return !!startTime && startTime !== 'N/A';
  }

  get availableStates(): string[] {
    return availableTaskStates;
  }
}
