import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
} from '@angular/core';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpErrorResponse } from '@angular/common/http';

import moment from 'moment';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { MiniTaskButtonsComponent } from './mini-task-buttons/mini-task-buttons.component';
import { MiniTaskItem, MiniTaskType } from '../../interfaces';
import { MessageService } from '../../../shared/services';
import { ModalUserFeedbackComponent } from '../../../shared/components/modal-user-feedback/modal-user-feedback.component';
import { TaskService } from '../../services';
import { ModelUserFeedbackType } from '../../../shared/interfaces';
@Component({
  selector: 'app-mini-task',
  imports: [
    TranslateModule,
    MiniTaskButtonsComponent,
    ModalUserFeedbackComponent,
  ],
  templateUrl: './mini-task.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiniTaskComponent {
  private router = inject(Router);
  private taskService = inject(TaskService);
  private translate = inject(TranslateService);
  messageService = inject(MessageService);

  destroyRef = inject(DestroyRef);

  taskItem = input.required<MiniTaskItem>();

  formatDate(dateString?: string): string {
    if (!dateString) return 'N/A';
    return moment(dateString).format('DD-MM-YYYY HH:mm');
  }

  manageClickedBtn(btnAction: MiniTaskType): void {
    switch (btnAction) {
      case 'view':
        this.manageClickViewBtn();
        break;

      case 'edit':
        this.manageClickEditBtn();
        break;

      case 'delete':
        this.manageClickDeleteBtn();
        break;

      default:
        throw new Error('Manage click option not implemented');
    }
  }

  private manageClickViewBtn(): void {
    // TODO: Pending implementation
  }

  private manageClickEditBtn(): void {
    // TODO: Pending implementation
  }

  private manageClickDeleteBtn(): void {
    const taskId = this.taskItem()._id;

    this.taskService
      .deleteTask(taskId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          const title = this.translate.instant(
            'modalUserFeedback.defaultSuccessTitle.deleteTask'
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
      // FIX: This navigation is not working
      this.router.navigateByUrl('/tasks');
    }
  }
}
