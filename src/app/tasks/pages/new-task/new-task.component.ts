import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';

import { HeaderService, TaskService } from '../../services';
import { ModalUserFeedbackComponent } from '../../../shared/components/modal-user-feedback/modal-user-feedback.component';
import { ModelUserFeedbackType } from '../../../shared/interfaces';
import { NewTaskRequest } from '../../interfaces';
import { FormService, MessageService } from '../../../shared/services';

@Component({
  selector: 'app-new-task',
  imports: [
    TranslateModule,
    ReactiveFormsModule,
    LucideAngularModule,
    ModalUserFeedbackComponent,
  ],
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
  messageService = inject(MessageService);
  destroyRef = inject(DestroyRef);

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
        next: async () => {
          const title = this.translate.instant(
            'modalUserFeedback.defaultSuccessTitle.newTask'
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

  closeModal(): void {
    this.messageService.isModalShown.set(false);
    if (this.messageService.modalType() === ModelUserFeedbackType.success) {
      this.router.navigateByUrl('/tasks');
    }
  }
}
