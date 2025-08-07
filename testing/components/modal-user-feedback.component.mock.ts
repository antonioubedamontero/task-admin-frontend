import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

import { ModelUserFeedbackType } from '../../src/app/shared/interfaces';
import { ModalUserFeedbackClass } from '../../src/app/shared/components/modal-user-feedback/modal-user-feedback.component';

@Component({
  selector: 'app-modal-user-feedback',
  imports: [],
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalUserFeedbackComponentMock {
  description = input.required<string>();
  modalType = input<ModelUserFeedbackType>(ModelUserFeedbackType.success);
  title = input<string>('default title');
  buttonText = input<string>('default text button');

  closeModal = output<boolean>();

  close(): void {
    this.closeModal.emit(true);
  }

  get textModalIconAndColor(): ModalUserFeedbackClass {
    return {
      color: 'text-lime-500',
      icon: 'circle-check',
    };
  }
}
