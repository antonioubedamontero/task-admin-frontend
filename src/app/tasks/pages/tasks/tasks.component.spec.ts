import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter, Router } from '@angular/router';
import { importProvidersFrom } from '@angular/core';

import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  ClipboardPen,
  Flag,
  Flower2,
  LucideAngularModule,
  Pause,
  Plus,
  Trash,
} from 'lucide-angular';

import TasksComponent from './tasks.component';
import {
  AuthServiceMock,
  HeaderServiceMock,
  TaskServiceMock,
  TranslateServiceMock,
} from '../../../../../testing/services';
import { TranslatePipeMock } from '../../../../../testing/pipes';
import { AuthService } from '../../../auth/services';
import { HeaderService, TaskService } from '../../services';
import { MiniTaskByCategoryComponentMock } from '../../../../../testing/components';
import { MiniTaskByCategoryComponent } from '../../components/mini-task-by-category/mini-task-by-category.component';
import { TaskState } from '../../interfaces';

const mockedRoutes = [
  {
    path: 'tasks/new',
    loadComponent: () =>
      import('../../../../../testing/components/task-layout.component.mock'),
  },
];

const lucideIcons = {
  Flower2,
  ClipboardPen,
  Pause,
  Trash,
  Plus,
  Flag,
};

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;
  let router: Router;
  let routerSpy: jasmine.Spy;
  let taskServiceSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LucideAngularModule,
        MiniTaskByCategoryComponentMock,
        TasksComponent,
      ],
      providers: [
        importProvidersFrom(LucideAngularModule.pick({ ...lucideIcons })),
        provideRouter(mockedRoutes),
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: TranslateService,
          useClass: TranslateServiceMock,
        },
        {
          provide: AuthService,
          useClass: AuthServiceMock,
        },
        {
          provide: TaskService,
          useClass: TaskServiceMock,
        },
        {
          provide: HeaderService,
          useClass: HeaderServiceMock,
        },
      ],
    })
      .overrideComponent(TasksComponent, {
        remove: {
          imports: [TranslateModule, MiniTaskByCategoryComponent],
        },
        add: {
          imports: [TranslatePipeMock, MiniTaskByCategoryComponentMock],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;

    router = TestBed.inject(Router);
    routerSpy = spyOn(component.router, 'navigateByUrl').and.callThrough();
    taskServiceSpy = spyOn(
      component.taskService,
      'getTasksByState'
    ).and.callThrough();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an add buton', () => {
    const addButtonHtml: HTMLButtonElement =
      fixture.nativeElement.querySelector('#add-tasks-button');
    expect(addButtonHtml).not.toBeFalsy();

    addButtonHtml.click();
    fixture.detectChanges();

    expect(routerSpy).toHaveBeenCalledWith('/tasks/new');
  });

  describe('- AppMiniTaskByCategory', () => {
    it('should render mini tasks in created state', () => {
      const createdTasksHtml =
        fixture.nativeElement.querySelectorAll('#created');
      expect(createdTasksHtml.length).toBeGreaterThan(0);
    });

    it('should render mini tasks in started state', () => {
      const startedTasksHtml =
        fixture.nativeElement.querySelectorAll('#started');
      expect(startedTasksHtml.length).toBeGreaterThan(0);
    });

    it('should render mini tasks in paused state', () => {
      const pausedTasksHtml = fixture.nativeElement.querySelectorAll('#paused');
      expect(pausedTasksHtml.length).toBeGreaterThan(0);
    });

    it('should render mini tasks in canceled state', () => {
      const canceledTasksHtml =
        fixture.nativeElement.querySelectorAll('#canceled');
      expect(canceledTasksHtml.length).toBeGreaterThan(0);
    });

    it('should render mini tasks in ended state', () => {
      const endedTasksHtml = fixture.nativeElement.querySelectorAll('#ended');
      expect(endedTasksHtml.length).toBeGreaterThan(0);
    });
  });

  it('should navigate to tasks/new when add task method is triggered', () => {
    component.addTask();
    expect(routerSpy).toHaveBeenCalledWith('/tasks/new');
  });

  it('should call api to retrieve CREATED tasks', () => {
    expect(taskServiceSpy).toHaveBeenCalledWith(TaskState.CREATED);
    expect(component.createdTaskItems().length).toBeGreaterThan(0);
  });

  it('should call api to retrieve STARTED tasks', () => {
    expect(taskServiceSpy).toHaveBeenCalledWith(TaskState.STARTED);
    expect(component.startedTaskItems().length).toBeGreaterThan(0);
  });

  it('should call api to retrieve PAUSED tasks', () => {
    expect(taskServiceSpy).toHaveBeenCalledWith(TaskState.PAUSED);
    expect(component.pausedTaskItems().length).toBeGreaterThan(0);
  });

  it('should call api to retrieve CANCELED tasks', () => {
    expect(taskServiceSpy).toHaveBeenCalledWith(TaskState.CANCELED);
    expect(component.canceledTaskItems().length).toBeGreaterThan(0);
  });

  it('should call api to retrieve ENDED tasks', () => {
    expect(taskServiceSpy).toHaveBeenCalledWith(TaskState.ENDED);
    expect(component.endedTaskItems().length).toBeGreaterThan(0);
  });
});
