import { ComponentFixture, TestBed } from '@angular/core/testing';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {
  ActivatedRoute,
  convertToParamMap,
  provideRouter,
} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Album, LucideAngularModule, X } from 'lucide-angular';

import TaskDetailsComponent from './task-details.component';
import {
  HeaderServiceMock,
  TaskServiceMock,
  TranslateServiceMock,
} from '../../../../../testing/services';
import { TranslatePipeMock } from '../../../../../testing/pipes';
import { TaskLogSectionComponentMock } from '../../../../../testing/components';
import { FormatDateService, HeaderService, TaskService } from '../../services';
import { MessageService } from '../../../shared/services';
import { TaskLogSectionComponent } from '../../components/task-log-section/task-log-section.component';

const mockedRoutes = [
  {
    path: 'tasks',
    loadComponent: () =>
      import('../../../../../testing/components/task-layout.component.mock'),
  },
];

const lucideIcons = {
  X,
  Album,
};

describe('TaskDetailsComponent', () => {
  let component: TaskDetailsComponent;
  let fixture: ComponentFixture<TaskDetailsComponent>;
  let taskServiceSpy: jasmine.Spy;
  let routerSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, TaskDetailsComponent],
      providers: [
        MessageService,
        FormatDateService,
        { provide: HeaderService, useClass: HeaderServiceMock },
        { provide: TaskService, useClass: TaskServiceMock },
        {
          provide: TranslateService,
          useClass: TranslateServiceMock,
        },
        provideRouter(mockedRoutes),
        provideHttpClientTesting(),
        importProvidersFrom(LucideAngularModule.pick(lucideIcons)),
      ],
    })
      .overrideComponent(TaskDetailsComponent, {
        remove: {
          imports: [TranslateModule, TaskLogSectionComponent],
          providers: [ActivatedRoute],
        },
        add: {
          imports: [TranslatePipeMock, TaskLogSectionComponentMock],
          providers: [
            {
              provide: ActivatedRoute,
              useValue: {
                snapshot: {
                  paramMap: convertToParamMap({ id: '123' }),
                },
              },
            },
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(TaskDetailsComponent);
    component = fixture.componentInstance;
    taskServiceSpy = spyOn(
      component.taskService,
      'getTaskById'
    ).and.callThrough();
    routerSpy = spyOn(component.router, 'navigateByUrl').and.callThrough();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a form with task details data', () => {
    fixture.detectChanges();

    const htmlNewFormTaskData = fixture.nativeElement.querySelector(
      'section#form-new-task-data'
    );
    expect(htmlNewFormTaskData).toBeTruthy();

    const htmlNameControl: HTMLInputElement =
      fixture.nativeElement.querySelector('#name');
    expect(htmlNameControl).toBeTruthy();
    expect(htmlNameControl.value).toBe(component.taskDetailValue()!.name);

    const htmlCurrentStateControl: HTMLInputElement =
      fixture.nativeElement.querySelector('#currentState');
    expect(htmlCurrentStateControl).toBeTruthy();
    expect(htmlCurrentStateControl.value).toBe(
      component.taskDetailValue()!.currentState
    );

    const { startDate, startTime, dueDate, dueTime, description } =
      component.taskDetailsForm.value;

    const htmlStartDateControl: HTMLInputElement =
      fixture.nativeElement.querySelector('#startDate');
    expect(htmlStartDateControl).toBeTruthy();
    expect(htmlStartDateControl.value).toBe(startDate!);

    const htmlStartTimeControl: HTMLInputElement =
      fixture.nativeElement.querySelector('#startTime');
    expect(htmlStartTimeControl).toBeTruthy();
    expect(htmlStartTimeControl.value).toBe(startTime!);

    const htmlDueDateControl: HTMLInputElement =
      fixture.nativeElement.querySelector('#dueDate');
    expect(htmlDueDateControl).toBeTruthy();
    expect(htmlDueDateControl.value).toBe(dueDate!);

    const htmlDueTimeControl: HTMLInputElement =
      fixture.nativeElement.querySelector('#dueTime');
    expect(htmlDueTimeControl).toBeTruthy();
    expect(htmlDueTimeControl.value).toBe(dueTime!);

    const htmlDescriptionControl: HTMLTextAreaElement =
      fixture.nativeElement.querySelector('#description');
    expect(htmlDescriptionControl).toBeTruthy();
    expect(htmlDescriptionControl.value).toBe(description!);

    const htmlCloseButton: HTMLButtonElement =
      fixture.nativeElement.querySelector('button[type="submit"]');
    expect(htmlCloseButton).toBeTruthy();
  });

  it('should render app-task-log-section', () => {
    const htmlAppTaskLogSection = fixture.nativeElement.querySelector(
      'app-task-log-section'
    );
    expect(htmlAppTaskLogSection).toBeTruthy();
  });

  it('should call api to get task by route id', () => {
    expect(taskServiceSpy).toHaveBeenCalledWith('123');
    expect(component.route.snapshot.paramMap.get('id')).toBe('123');
    expect(component.taskDetailValue()).toBeTruthy();
  });

  it('task form should have task details recover from api', () => {
    const { name, description, currentState, startDate, dueDate } =
      component.taskDetailValue()!;

    const expectedFormValue = {
      name,
      description,
      currentState,
      currentStateTranslated: `mock translation taskStates.${currentState!}`,
      startDate: component.formatDateService.getDate(startDate!, false),
      startTime: component.formatDateService.getTime(startDate!, false),
      dueDate: component.formatDateService.getDate(dueDate!, false),
      dueTime: component.formatDateService.getTime(dueDate!, false),
    };
    component.taskDetailsForm.updateValueAndValidity();
    fixture.detectChanges();
    expect(component.taskDetailsForm.value).toEqual(expectedFormValue);
  });

  it('should navigate to tasks page when close is method is called', () => {
    component.closeModal();
    expect(routerSpy).toHaveBeenCalledWith('/tasks');
    expect(component.messageService.isModalShown()).toBeFalsy();
  });
});
