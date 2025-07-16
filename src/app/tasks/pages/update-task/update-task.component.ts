import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  effect,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { rxResource, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpErrorResponse } from '@angular/common/http';

import { map } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';

import { FormatDateService, HeaderService, TaskService } from '../../services';
import { FormService, MessageService } from '../../../shared/services';
import {
  availableTaskStates,
  FormDetail,
  TaskResponseItem,
  TaskState,
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
export default class UpdateTasksComponent implements OnInit {
  translate = inject(TranslateService);
  headerService = inject(HeaderService);
  taskService = inject(TaskService);
  messageService = inject(MessageService);
  fb = inject(FormBuilder);
  router = inject(Router);
  destroyRef = inject(DestroyRef);
  route = inject(ActivatedRoute);

  formService = inject(FormService);
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

  areDatesDisabled = signal<boolean>(true);
  toggleDatesClasses = computed(() => {
    return this.areDatesDisabled() ? 'input-field-readonly' : 'input-field';
  });

  taskDetailsForm = this.fb.group({
    _id: [''],
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    currentState: [TaskState.CREATED, [Validators.required]],
    justification: ['', [Validators.required]],
    startDate: [''],
    startTime: [''],
    dueDate: [''],
    dueTime: [''],
  });

  constructor() {
    this.setHeaderTitle();
  }

  ngOnInit(): void {
    this.manageCurrentStateTaskChangeValues();
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

  private manageCurrentStateTaskChangeValues(): void {
    this.taskDetailsForm.controls.currentState.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((currentState) => {
        const datesDisabled =
          !currentState || currentState !== TaskState.STARTED;
        this.areDatesDisabled.set(datesDisabled);

        const { startDate, startTime, dueDate, dueTime } =
          this.taskDetailsForm.controls;

        if (this.areDatesDisabled()) {
          // TODO: Reset dates to initial values
          this.disableDatesAndTime([startDate, startTime, dueDate, dueTime]);
          return;
        }

        this.enableDatesAndTime([startDate, startTime, dueDate, dueTime]);
      });
  }

  private disableDatesAndTime(datesAndTime: FormControl[]): void {
    datesAndTime.forEach((control) => control.disable());
  }

  private enableDatesAndTime(datesAndTime: FormControl[]): void {
    datesAndTime.forEach((control) => control.enable());
  }

  setFormValue(taskDetailData: TaskResponseItem): void {
    const {
      _id,
      name,
      description,
      currentState: currentStateData,
      startDate,
      dueDate,
    } = taskDetailData;

    this.taskDetailsForm.patchValue({
      _id,
      name,
      description,
      // This value always exists
      currentState: currentStateData ?? TaskState.CREATED,
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

  resetForm(): void {
    const { _id, name, description, currentState, startDate, dueDate } =
      this.taskDetailValue()!;

    const initialFormValue: Partial<FormDetail> = {
      _id,
      name,
      description,
      currentState,
      justification: '',
    };

    if (startDate && startDate.length > 0) {
      initialFormValue['startDate'] =
        this.formatDateService.getDateFromIsoString(startDate)!;
    }

    if (startDate && startDate.length > 0) {
      initialFormValue['startTime'] =
        this.formatDateService.getTimeFromIsoString(startDate)!;
    }

    if (dueDate && dueDate.length > 0) {
      initialFormValue['dueDate'] =
        this.formatDateService.getDateFromIsoString(dueDate)!;
    }

    if (dueDate && dueDate.length > 0) {
      initialFormValue['dueTime'] =
        this.formatDateService.getTimeFromIsoString(dueDate)!;
    }

    this.taskDetailsForm.reset({
      ...initialFormValue,
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

    Object.keys(data).forEach((formKey: string) => {
      const formValue = data[formKey];
      const invalidValues = [null, ''];
      const isDataValueValid =
        formValue && formValue !== null && !invalidValues.includes(formValue);
      if (isDataValueValid) {
        cleanData[formKey as keyof UpdateTaskRequest] = data[formKey];
      }
    });

    if (this.isValidDate(startDate) && this.isValidTime(startTime)) {
      cleanData.startDate = this.formatDateService.getDateIsoStringFormDateTime(
        startDate,
        startTime
      )!;
    }

    if (this.isValidDate(dueDate) && this.isValidTime(dueTime)) {
      cleanData.dueDate = this.formatDateService.getDateIsoStringFormDateTime(
        dueDate,
        dueTime
      )!;
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
    return !!startDate && startDate !== '';
  }

  private isValidTime(startTime: string): boolean {
    return !!startTime && startTime !== '';
  }

  setTimeToForm(field: string, event: any) {
    const time = event.target.value;
    this.taskDetailsForm.get(field)?.setValue(time);
  }

  setDateToForm(field: string, event: any) {
    const date = event.target.value;
    this.taskDetailsForm.get(field)?.setValue(date);
  }

  // getters

  get availableStates(): string[] {
    return availableTaskStates;
  }
}
