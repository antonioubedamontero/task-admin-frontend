import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskLogSectionComponent } from './task-log-section.component';

describe('TaskLogSectionComponent', () => {
  let component: TaskLogSectionComponent;
  let fixture: ComponentFixture<TaskLogSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskLogSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskLogSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
