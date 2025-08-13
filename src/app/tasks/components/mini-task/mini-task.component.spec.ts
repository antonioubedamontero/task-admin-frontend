import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { MiniTaskComponent } from './mini-task.component';
import {
  TaskServiceMock,
  TranslateServiceMock,
} from '../../../../../testing/services';
import { TranslatePipeMock } from '../../../../../testing/pipes';
import {
  MiniTaskButtonsComponentMock,
  ModalUserFeedbackComponentMock,
} from '../../../../../testing/components';
import { FormatDateService, TaskService } from '../../services';
import { MessageService } from '../../../shared/services';
import { MiniTaskButtonsComponent } from './mini-task-buttons/mini-task-buttons.component';
import { MiniTaskType } from '../../interfaces';
import { ModelUserFeedbackType } from '../../../shared/interfaces';

describe('MiniTaskComponent', () => {
  let component: MiniTaskComponent;
  let fixture: ComponentFixture<MiniTaskComponent>;
  let routerSpy: jasmine.Spy;
  let deleteCallSpy: jasmine.Spy;
  let messageServiceSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MiniTaskComponent,
        MiniTaskButtonsComponentMock,
        ModalUserFeedbackComponentMock,
      ],
      providers: [
        provideRouter([
          {
            path: 'tasks',
            loadComponent: () =>
              import(
                '../../../../../testing/components/task-layout.component.mock'
              ),
          },
        ]),
        FormatDateService,
        MessageService,
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: TranslateService, useClass: TranslateServiceMock },
        { provide: TaskService, useClass: TaskServiceMock },
      ],
    })
      .overrideComponent(MiniTaskComponent, {
        remove: {
          imports: [TranslateModule, MiniTaskButtonsComponent],
        },
        add: {
          imports: [TranslatePipeMock, MiniTaskButtonsComponentMock],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(MiniTaskComponent);
    component = fixture.componentInstance;

    routerSpy = spyOn(component['router'], 'navigate').and.callThrough();
    deleteCallSpy = spyOn(
      component['taskService'],
      'deleteTask'
    ).and.callThrough();
    messageServiceSpy = spyOn(
      component['messageService'],
      'showModal'
    ).and.callThrough();

    const taskItem = {
      _id: 'ABC123',
      title: 'mock title',
      startDate: new Date().toString(),
      dueDate: new Date().toString(),
      description: 'mock description',
    };
    fixture.componentRef.setInput('taskItem', taskItem);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('- should render card with', () => {
    it('title', () => {
      const htmlCardTitle: HTMLHeadingElement =
        fixture.nativeElement.querySelector('#title');
      expect(htmlCardTitle.innerHTML.trim()).toBe(
        component.taskItem().title.trim()
      );
    });

    it('start date', () => {
      const htmlCardstartDate: HTMLSpanElement =
        fixture.nativeElement.querySelector('#startDate');
      expect(htmlCardstartDate.innerHTML.trim()).toBe(
        component.getFormatDateFromIsoDate(component.startDate())
      );
    });

    it('due date', () => {
      const htmlCardDueDate: HTMLSpanElement =
        fixture.nativeElement.querySelector('#dueDate');
      expect(htmlCardDueDate.innerHTML.trim()).toBe(
        component.getFormatDateFromIsoDate(component.dueDate())
      );
    });

    it('description', () => {
      const htmlCardDescription: HTMLDivElement =
        fixture.nativeElement.querySelector('#description');
      expect(htmlCardDescription.innerHTML.trim()).toBe(
        component.taskItem().description.trim()
      );
    });

    it('mini task buttons', () => {
      const htmlCardButtons: HTMLElement = fixture.nativeElement.querySelector(
        'app-mini-task-buttons'
      );
      expect(htmlCardButtons).toBeTruthy();
    });
  });

  describe('- Manage click button action', () => {
    beforeEach(() => {
      routerSpy.calls.reset();
    });

    it('should navigate to task id detail when click in view', () => {
      component.manageClickedBtn('view');
      expect(routerSpy).toHaveBeenCalledWith([
        '/tasks',
        component.taskItem()._id,
      ]);
    });

    it('should navigate to task id edit when click in edit', () => {
      component.manageClickedBtn('edit');
      expect(routerSpy).toHaveBeenCalledWith([
        '/tasks',
        component.taskItem()._id,
        'edit',
      ]);
    });

    it('should delete task and show an ok message when click in delete and endpoints return an ok message', () => {
      component.manageClickedBtn('delete');
      expect(deleteCallSpy).toHaveBeenCalledWith(component.taskItem()._id);
      expect(messageServiceSpy).toHaveBeenCalled();
    });

    it('should thrown an error if action is wrong', () => {
      try {
        const action = 'wrong';
        component.manageClickedBtn(action as unknown as MiniTaskType);
      } catch (error) {
        const expectedError = new Error('Manage click option not implemented');
        expect(error).toEqual(expectedError);
      }
    });

    describe('- getFormatDateFromIsoDate', () => {
      it('should return formatted date if date is filled', () => {
        const isoDate = new Date().toISOString();

        expect(component.getFormatDateFromIsoDate(isoDate)).toBe(
          component.formatDateService.getFormattedDateFromIsoDate(isoDate)
        );
      });

      it('should return N/A if date is not filled', () => {
        const isoDate = undefined;
        expect(component.getFormatDateFromIsoDate(isoDate)).toBe('N/A');
      });
    });

    it('when close modal it should navigate to tasks page if success message', () => {
      component.messageService.modalType.set(ModelUserFeedbackType.success);
      component.closeModal();
      expect(routerSpy).toHaveBeenCalledWith(['/tasks']);
    });
  });
});
