import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUserFeedbackComponent } from './modal-user-feedback.component';

describe('ModalUserFeedbackComponent', () => {
  let component: ModalUserFeedbackComponent;
  let fixture: ComponentFixture<ModalUserFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalUserFeedbackComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalUserFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
