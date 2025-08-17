import { TestBed } from '@angular/core/testing';
import { TaskStatePipe } from './task-state.pipe';

import { TranslateService } from '@ngx-translate/core';

import { TranslateServiceMock } from '../../../../testing/services/index';

describe('TaskStatePipe', () => {
  let service: TaskStatePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: TranslateService, useClass: TranslateServiceMock },
        TaskStatePipe,
      ],
    });
    service = TestBed.inject(TaskStatePipe);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a translation', () => {
    const translationKey = 'key';
    const translation = service.transform(translationKey);
    expect(translation).toBe(`mock translation taskStates.${translationKey}`);
  });
});
