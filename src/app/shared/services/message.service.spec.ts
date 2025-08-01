import { TestBed } from '@angular/core/testing';

import { MessageService } from './message.service';
import { ModelUserFeedbackType } from '../interfaces';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open a modal message with a title and description', () => {
    service.showModal(
      'Modal Title',
      'Operation go well',
      ModelUserFeedbackType.success
    );
    expect(service.isModalShown()).toBeTruthy();
    expect(service.modalTitle()).toBe('Modal Title');
    expect(service.modalType()).toBe(ModelUserFeedbackType.success);
    expect(service.modalText()).toBe('Operation go well');
  });

  it('should closeModal', () => {
    service.showModal(
      'Modal Title',
      'Operation go well',
      ModelUserFeedbackType.WARNING
    );

    service.closeModal();
    expect(service.isModalShown()).toBeFalsy();
    expect(service.modalType()).toBe(ModelUserFeedbackType.success);
    expect(service.modalTitle()).toBe('');
    expect(service.modalText()).toBe('');
  });
});
