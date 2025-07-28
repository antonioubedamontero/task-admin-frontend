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
import moment from 'moment';

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

// Local interfaces
interface Dates {
  startDate: FormControl;
  startTime: FormControl;
  dueDate: FormControl;
  dueTime: FormControl;
}

interface TaskDetailForm {
  _id: string;
  name: string;
  description: string;
  currentState: TaskState;
  justification: string;
  startDate: string;
  startTime: string;
  dueDate: string;
  dueTime: string;
}

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

        const dates: Dates = { startDate, startTime, dueDate, dueTime };
        if (this.areDatesDisabled()) {
          this.resetDatesToInitialValues();
          this.disableDatesAndTime(dates);
          return;
        }

        this.enableDatesAndTime(dates);
      });
  }

  private resetDatesToInitialValues(): void {
    const isoStartDate = this.taskDetailValue()?.startDate ?? undefined;
    const isoDueDate = this.taskDetailValue()?.dueDate ?? undefined;

    this.taskDetailsForm.patchValue({
      startDate: isoStartDate
        ? this.formatDateService.getDate(isoStartDate, false)
        : null,
      startTime: isoStartDate
        ? this.formatDateService.getTime(isoStartDate, false)
        : null,
      dueDate: isoDueDate
        ? this.formatDateService.getDate(isoDueDate, false)
        : null,
      dueTime: isoDueDate
        ? this.formatDateService.getTime(isoDueDate, false)
        : null,
    });
  }

  private disableDatesAndTime(dates: Dates): void {
    const dateValues: FormControl[] = Object.values(dates);
    dateValues.forEach((control) => control.disable());
  }

  private enableDatesAndTime(dates: Dates): void {
    const dateValues: FormControl[] = Object.values(dates);
    dateValues.forEach((control) => control.enable());
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
      startDate: startDate ? moment(startDate).format('YYYY-MM-DD') : '',
      startTime: startDate ? moment(startDate).format('HH:mm:ss') : '',
      dueDate: dueDate ? moment(dueDate).format('YYYY-MM-DD') : '',
      dueTime: dueDate ? moment(dueDate).format('HH:mm:ss') : '',
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
      initialFormValue['startDate'] = moment(startDate).format('YYYY-MM-DD');
    }

    if (startDate && startDate.length > 0) {
      initialFormValue['startTime'] = moment(startDate).format('HH:mm:ss');
    }

    if (dueDate && dueDate.length > 0) {
      initialFormValue['dueDate'] = moment(dueDate).format('YYYY-MM-DD');
    }

    if (dueDate && dueDate.length > 0) {
      initialFormValue['dueTime'] = moment(dueDate).format('HH:mm:ss');
    }

    this.taskDetailsForm.reset({
      ...initialFormValue,
    });
  }

  sendForm(): void {
    if (!this.taskDetailsForm.valid) {
      this.taskDetailsForm.markAllAsTouched();
      return;
    }

    const cleanedData = this.cleanData(
      this.taskDetailsForm.value as TaskDetailForm
    );

    const updateTaskReq = this.mapDataToUpdateTaskRequest(cleanedData);

    this.updateTask(updateTaskReq);
  }

  private cleanData(rawFormData: TaskDetailForm): TaskDetailForm {
    return Object.keys(rawFormData).reduce((cleanObject, currentKey) => {
      const keyValue = rawFormData[currentKey as keyof TaskDetailForm];
      if (keyValue === null || keyValue === undefined || keyValue === '')
        return cleanObject;
      return { ...cleanObject, [currentKey]: keyValue };
    }, {}) as TaskDetailForm;
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

  private mapDataToUpdateTaskRequest(
    cleanFormData: TaskDetailForm
  ): UpdateTaskRequest {
    const { startDate, startTime, dueDate, dueTime, _id, ...data } =
      cleanFormData;

    const mappedData: Partial<UpdateTaskRequest> = { taskId: _id!, ...data };

    if (startDate && startTime) {
      mappedData.startDate = this.formatDateService.getIsoStringFromLocalDate(
        startDate!,
        startTime!
      )!;
    }

    if (dueDate && dueTime) {
      mappedData.dueDate = this.formatDateService.getIsoStringFromLocalDate(
        dueDate!,
        dueTime!
      )!;
    }

    return mappedData as UpdateTaskRequest;
  }

  closeModal(): void {
    this.messageService.isModalShown.set(false);
    if (this.messageService.modalType() === ModelUserFeedbackType.success) {
      this.router.navigateByUrl('/tasks');
    }
  }

  setTimeToForm(field: string, time: string) {
    this.taskDetailsForm.get(field)?.setValue(time);
  }

  setDateToForm(field: string, date: string) {
    this.taskDetailsForm.get(field)?.setValue(date);
  }

  // getters

  get availableStates(): string[] {
    return availableTaskStates;
  }
}
