import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {
  ActivatedRoute,
  convertToParamMap,
  provideRouter,
} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { importProvidersFrom } from '@angular/core';

import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ListRestart, LucideAngularModule, Save, X } from 'lucide-angular';

import UpdateTasksComponent from './update-task.component';
import {
  HeaderServiceMock,
  TaskServiceMock,
  TranslateServiceMock,
} from '../../../../../testing/services';
import {
  TaskStatePipeMock,
  TranslatePipeMock,
} from '../../../../../testing/pipes';
import { TaskLogSectionComponent } from '../../components/task-log-section/task-log-section.component';
import {
  ModalUserFeedbackComponentMock,
  TaskLogSectionComponentMock,
} from '../../../../../testing/components';
import { TaskStatePipe } from '../../pipes/task-state.pipe';
import { FormatDateService, HeaderService, TaskService } from '../../services';
import { FormService, MessageService } from '../../../shared/services';
import { taskResponseItemData } from '../../../../../testing/data';
import { FormDetail, TaskState } from '../../interfaces';

const mockedRoutes = [
  {
    path: 'tasks',
    loadComponent: () =>
      import('../../../../../testing/components/task-layout.component.mock'),
  },
];

const lucideIcons = {
  Save,
  ListRestart,
  X,
};

describe('UpdateTasksComponent', () => {
  let component: UpdateTasksComponent;
  let fixture: ComponentFixture<UpdateTasksComponent>;
  let getTaskByIdSpy: jasmine.Spy;
  let updateTaskSpy: jasmine.Spy;
  let routerSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LucideAngularModule,
        ModalUserFeedbackComponentMock,
        ReactiveFormsModule,
        UpdateTasksComponent,
      ],
      providers: [
        importProvidersFrom(LucideAngularModule.pick({ ...lucideIcons })),
        MessageService,
        FormService,
        FormatDateService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: '123' }),
            },
          },
        },
        { provide: TaskService, useClass: TaskServiceMock },
        { provide: TaskStatePipe, useClass: TaskStatePipeMock },
        {
          provide: TranslateService,
          useClass: TranslateServiceMock,
        },
        {
          provide: HeaderService,
          useClass: HeaderServiceMock,
        },
        provideRouter(mockedRoutes),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    })
      .overrideComponent(UpdateTasksComponent, {
        remove: {
          imports: [TranslateModule, TaskLogSectionComponent],
        },
        add: {
          imports: [TranslatePipeMock, TaskLogSectionComponentMock],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(UpdateTasksComponent);
    component = fixture.componentInstance;
    updateTaskSpy = spyOn(
      component.taskService,
      'updateTask'
    ).and.callThrough();

    getTaskByIdSpy = spyOn(
      component.taskService,
      'getTaskById'
    ).and.callThrough();
    routerSpy = spyOn(component.router, 'navigateByUrl').and.callThrough();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a form with fields to update and save button', () => {
    component.taskDetailsForm.updateValueAndValidity();
    fixture.detectChanges();

    const htmlForm = fixture.nativeElement.querySelector('form');
    expect(htmlForm).toBeTruthy();

    const htmlNameControl = fixture.nativeElement.querySelector('input#name');
    expect(htmlNameControl).toBeTruthy();
    expect(htmlNameControl.value).toBe(component.taskDetailValue()?.name);

    const htmlCurrentStateControl = fixture.nativeElement.querySelector(
      'select#currentState'
    );
    expect(htmlCurrentStateControl).toBeTruthy();
    expect(htmlCurrentStateControl.value).toBe(
      component.taskDetailValue()?.currentState
    );

    const htmlStartDateControl =
      fixture.nativeElement.querySelector('input#startDate');
    expect(htmlStartDateControl).toBeTruthy();
    expect(htmlStartDateControl.value).toBe(
      component.formatDateService.getDate(
        new Date(component.taskDetailValue()?.startDate ?? '').toISOString(),
        false
      )
    );

    const htmlStartTimeControl =
      fixture.nativeElement.querySelector('input#startTime');
    expect(htmlStartTimeControl).toBeTruthy();
    expect(htmlStartTimeControl.value).toBe(
      component.formatDateService.getTime(
        new Date(component.taskDetailValue()?.startDate ?? '').toISOString(),
        false
      )
    );

    const htmlDueDateControl =
      fixture.nativeElement.querySelector('input#dueDate');
    expect(htmlDueDateControl).toBeTruthy();
    expect(htmlDueDateControl.value).toBe(
      component.formatDateService.getDate(
        new Date(component.taskDetailValue()?.dueDate ?? '').toISOString(),
        false
      )
    );

    const htmlDueTimeControl =
      fixture.nativeElement.querySelector('input#dueTime');
    expect(htmlDueTimeControl).toBeTruthy();
    expect(htmlDueTimeControl.value).toBe(
      component.formatDateService.getTime(
        new Date(component.taskDetailValue()?.dueDate ?? '').toISOString(),
        false
      )
    );

    const htmlJustificationControl = fixture.nativeElement.querySelector(
      'textarea#justification'
    );
    expect(htmlJustificationControl).toBeTruthy();

    const htmlDescriptionControl = fixture.nativeElement.querySelector(
      'textarea#description'
    );
    expect(htmlDescriptionControl).toBeTruthy();
    expect(htmlDescriptionControl.value).toBe(
      component.taskDetailValue()?.description
    );

    const htmlSubmitButton = fixture.nativeElement.querySelector('button');
    expect(htmlSubmitButton).toBeTruthy();
  });

  it('should render a app-task-log-section', () => {
    fixture.detectChanges();

    const htmlAppTaskLogSection = fixture.nativeElement.querySelector(
      'app-task-log-section'
    );
    expect(htmlAppTaskLogSection).toBeTruthy();
  });

  it('should get from api task details and set to form', () => {
    fixture.detectChanges();
    component.taskDetailsForm.updateValueAndValidity();

    expect(getTaskByIdSpy).toHaveBeenCalled();

    const { name, description, currentState } = taskResponseItemData;

    const formTaskDetailValue = component.taskDetailsForm.value;
    const expectedFormTaskDetailValue = {
      _id: component.taskDetailValue()?._id,
      name,
      description,
      currentState,
      justification: '',
    };
    expect(component.taskDetailValue()).toBeTruthy();
    expect(formTaskDetailValue).toEqual(expectedFormTaskDetailValue);
  });

  it('should call api to update task if valid', () => {
    fixture.detectChanges();
    component.taskDetailsForm.updateValueAndValidity();

    component.taskDetailsForm.patchValue({
      currentState: TaskState.CANCELED,
      justification: 'cancelled by user',
    });

    component.sendForm();
    component.closeModal();

    expect(updateTaskSpy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith('/tasks');
  });

  it('should not call api to update task if fields are invalid', () => {
    fixture.detectChanges();
    component.taskDetailsForm.updateValueAndValidity();

    component.sendForm();

    expect(updateTaskSpy).not.toHaveBeenCalled();
  });

  it('should reset form if reset form method is trigged', () => {
    fixture.detectChanges();

    const { _id, name, description, currentState } =
      component.taskDetailValue()!;

    component.resetForm();
    component.taskDetailsForm.updateValueAndValidity();

    const initialFormValue: Partial<FormDetail> = {
      _id,
      name,
      description,
      currentState,
      justification: '',
    };
    expect(component.taskDetailsForm.value).toEqual(initialFormValue);
  });
});
