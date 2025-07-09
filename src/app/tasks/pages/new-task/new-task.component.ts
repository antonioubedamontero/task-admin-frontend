import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { HeaderService, TaskService } from '../../services';
import { ModalUserFeedbackComponent } from '../../../shared/components/modal-user-feedback/modal-user-feedback.component';
import { ModelUserFeedbackType } from '../../../shared/interfaces';
import { NewTaskRequest } from '../../interfaces';
import { FormService } from '../../../shared/services';

@Component({
  selector: 'app-new-task',
  imports: [TranslateModule, ReactiveFormsModule, ModalUserFeedbackComponent],
  templateUrl: './new-task.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NewTaskComponent {
  translate = inject(TranslateService);
  headerService = inject(HeaderService);
  taskService = inject(TaskService);
  fb = inject(FormBuilder);
  router = inject(Router);
  formService = inject(FormService);
  destroyRef = inject(DestroyRef);

  modelUserFeedbackType = ModelUserFeedbackType;
  isErrorModal = signal<boolean>(false);
  errorText = signal<string>('');

  constructor() {
    const headerTitle = this.translate.instant('newTask.title');
    this.headerService.setTitle(headerTitle);
    this.headerService.showBackBtn = true;
  }

  newTaskForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
  });

  submitNewTask(): void {
    if (this.newTaskForm.invalid) {
      this.newTaskForm.markAllAsTouched();
      return;
    }

    const { name, description } = this.newTaskForm.value;
    if (!name || !description) return;

    const newTaskRequest: NewTaskRequest = { name, description };
    this.sendnewTaskRequest(newTaskRequest);
  }

  sendnewTaskRequest(newTaskRequest: NewTaskRequest): void {
    this.taskService
      .addNewTask(newTaskRequest)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => this.router.navigateByUrl('/tasks'),
        error: (errorResponse: HttpErrorResponse) => {
          this.isErrorModal.set(true);
          this.errorText.set(errorResponse.error.message);
        },
      });
  }

  closeModal(): void {
    this.isErrorModal.set(false);
    this.errorText.set('');
  }
}
