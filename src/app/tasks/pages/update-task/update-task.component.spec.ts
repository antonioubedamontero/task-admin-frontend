import { ComponentFixture, TestBed } from '@angular/core/testing';

import UpdateTasksComponent from './update-task.component';

describe('UpdateTasksComponent', () => {
  let component: UpdateTasksComponent;
  let fixture: ComponentFixture<UpdateTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateTasksComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
