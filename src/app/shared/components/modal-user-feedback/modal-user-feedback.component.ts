import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';

import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { ModelUserFeedbackType } from '../../interfaces';

export interface ModalUserFeedbackClass {
  color: string;
  icon: string;
}
@Component({
  selector: 'app-modal-user-feedback',
  imports: [TranslateModule, LucideAngularModule],
  templateUrl: './modal-user-feedback.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalUserFeedbackComponent {
  translate = inject(TranslateService);

  description = input.required<string>();
  modalType = input<ModelUserFeedbackType>(ModelUserFeedbackType.success);
  title = input<string>(
    this.translate.instant('modalUserFeedback.defaultTitle')
  );
  buttonText = input<string>(
    this.translate.instant('modalUserFeedback.defaultCloseBtnTitle')
  );

  closeModal = output<boolean>();

  close(): void {
    this.closeModal.emit(true);
  }

  get textModalIconAndColor(): ModalUserFeedbackClass {
    switch (this.modalType()) {
      case ModelUserFeedbackType.ERROR:
        return {
          color: 'text-red-500',
          icon: 'circle-x',
        };
      case ModelUserFeedbackType.WARNING:
        return {
          color: 'text-orange-300',
          icon: 'circle-alert',
        };
      case ModelUserFeedbackType.success:
        return {
          color: 'text-lime-500',
          icon: 'circle-check',
        };
      default:
        throw new Error('TextModalIconAndColor is undefined');
    }
  }
}
