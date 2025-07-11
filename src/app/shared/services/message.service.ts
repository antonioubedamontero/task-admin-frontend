import { Injectable, signal } from '@angular/core';

import { ModelUserFeedbackType } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  isModalShown = signal<boolean>(false);
  modalTitle = signal<string>('');
  modalType = signal<ModelUserFeedbackType>(ModelUserFeedbackType.success);
  modalText = signal<string>('');

  showModal(
    title: string,
    message: string,
    modalType: ModelUserFeedbackType
  ): void {
    this.isModalShown.set(true);
    this.modalType.set(modalType);
    this.modalTitle.set(title);
    this.modalText.set(message);
  }

  closeModal(): void {
    this.isModalShown.set(false);
    this.modalType.set(ModelUserFeedbackType.success);
    this.modalText.set('');
    this.modalTitle.set('');
  }
}
