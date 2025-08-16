import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { importProvidersFrom } from '@angular/core';

import NewTaskComponent from './new-task.component';
import {
  HeaderServiceMock,
  TaskServiceMock,
  TranslateServiceMock,
} from '../../../../../testing/services';
import { HeaderService, TaskService } from '../../services';

import { TranslatePipeMock } from '../../../../../testing/pipes';
import {
  CircleCheck,
  CircleX,
  LucideAngularModule,
  Save,
} from 'lucide-angular';
import { ModalUserFeedbackComponentMock } from '../../../../../testing/components';
import { environment } from '../../../../environments/environment';
import { throwError } from 'rxjs';
import { ModelUserFeedbackType } from '../../../shared/interfaces';

const lucideIcons = {
  CircleX,
  CircleCheck,
  Save,
};

const mockedRoutes = [
  {
    path: 'tasks',
    loadComponent: () =>
      import('../../../../../testing/components/task-layout.component.mock'),
  },
];

const BASE_URL = environment.BASE_URL;

describe('NewTaskComponent', () => {
  let component: NewTaskComponent;
  let fixture: ComponentFixture<NewTaskComponent>;
  let routerNavigateSpy: jasmine.Spy;
  let messageServiceSpy: jasmine.Spy;
  let addNewTaskCallServiceSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        LucideAngularModule,
        ModalUserFeedbackComponentMock,
        NewTaskComponent,
      ],
      providers: [
        provideRouter(mockedRoutes),
        importProvidersFrom(LucideAngularModule.pick({ ...lucideIcons })),
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: HeaderService,
          useClass: HeaderServiceMock,
        },
        {
          provide: TaskService,
          useClass: TaskServiceMock,
        },
        {
          provide: TranslateService,
          useClass: TranslateServiceMock,
        },
      ],
    })
      .overrideComponent(NewTaskComponent, {
        remove: {
          imports: [TranslateModule],
        },
        add: {
          imports: [TranslatePipeMock],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(NewTaskComponent);
    component = fixture.componentInstance;

    routerNavigateSpy = spyOn(
      component.router,
      'navigateByUrl'
    ).and.callThrough();
    messageServiceSpy = spyOn(
      component.messageService,
      'showModal'
    ).and.callThrough();
    addNewTaskCallServiceSpy = spyOn(
      component.taskService,
      'addNewTask'
    ).and.callThrough();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a form with name, description and add task button', () => {
    const htmlForm = fixture.nativeElement.querySelector('form');
    const htmlNameControl = fixture.nativeElement.querySelector('#name');
    const htmlDescriptionControl =
      fixture.nativeElement.querySelector('#description');
    const htmlAddTaskButton = fixture.nativeElement.querySelector('button');

    expect(htmlForm).toBeTruthy();
    expect(htmlNameControl).toBeTruthy();
    expect(htmlDescriptionControl).toBeTruthy();
    expect(htmlAddTaskButton).toBeTruthy();
  });

  it('should not call to addNewTask if form is invalid', () => {
    component.newTaskForm.setValue({
      name: 'new task',
      description: '',
    });
    component.newTaskForm.updateValueAndValidity();

    expect(addNewTaskCallServiceSpy).not.toHaveBeenCalled();
  });

  describe('- when fill add task form', () => {
    beforeEach(() => {
      addNewTaskCallServiceSpy.calls.reset();
      messageServiceSpy.calls.reset();

      component.newTaskForm.setValue({
        name: 'new task',
        description: 'task description',
      });
      component.newTaskForm.updateValueAndValidity();
    });

    it('should call to addNewTask api to add new task and show confirmation message if ok', () => {
      const newTask = {
        name: 'new task',
        description: 'task description',
      };
      expect(component.newTaskForm.valid).toBeTruthy();

      component.submitNewTask();
      fixture.detectChanges();

      expect(addNewTaskCallServiceSpy).toHaveBeenCalledWith(newTask);
      expect(messageServiceSpy).toHaveBeenCalledWith(
        'mock translation modalUserFeedback.defaultSuccessTitle.newTask',
        'mock translation modalUserFeedback.defaultSuccessMessage',
        ModelUserFeedbackType.success
      );
    });

    it('should call to addNewTask api to add new task and show error message if api return http errror', () => {
      component.submitNewTask();
      fixture.detectChanges();
      component.closeModal();

      expect(routerNavigateSpy).toHaveBeenCalledWith('/tasks');
    });

    it('should show an error message when endpoint returns an error', () => {
      const simulatedError = new HttpErrorResponse({
        error: 'Server error',
        status: 500,
        statusText: 'Internal Server Error',
        url: `${BASE_URL}/tasks`,
      });
      const fakeHttpRequest$ = throwError(() => simulatedError);
      addNewTaskCallServiceSpy.and.returnValue(fakeHttpRequest$);

      component.submitNewTask();

      fixture.detectChanges();

      expect(addNewTaskCallServiceSpy).toHaveBeenCalled();
      expect(messageServiceSpy).toHaveBeenCalledWith(
        'mock translation modalUserFeedback.defaultErrorTitle',
        undefined,
        ModelUserFeedbackType.ERROR
      );
    });
  });
});
