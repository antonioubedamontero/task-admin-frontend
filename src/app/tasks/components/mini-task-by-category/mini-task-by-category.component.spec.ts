import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Eye, LucideAngularModule } from 'lucide-angular';

import { MiniTaskByCategoryComponent } from './mini-task-by-category.component';
import { TaskState } from '../../interfaces';
import { miniTaskItemData } from '../../../../../testing/data';
import { MiniTaskComponentMock } from '../../../../../testing/components';
import { TranslateServiceMock } from '../../../../../testing/services';
import { TranslatePipeMock } from '../../../../../testing/pipes';
import { MiniTaskComponent } from '../mini-task/mini-task.component';

const lucideIcons = { Eye };

describe('MiniTaskByCategoryComponent', () => {
  let component: MiniTaskByCategoryComponent;
  let fixture: ComponentFixture<MiniTaskByCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiniTaskByCategoryComponent, LucideAngularModule],
      providers: [
        importProvidersFrom(LucideAngularModule.pick({ ...lucideIcons })),
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: TranslateService,
          useClass: TranslateServiceMock,
        },
      ],
    })
      .overrideComponent(MiniTaskByCategoryComponent, {
        remove: {
          imports: [TranslateModule, MiniTaskComponent],
        },
        add: {
          imports: [TranslatePipeMock, MiniTaskComponentMock],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(MiniTaskByCategoryComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('title', 'mock title');
    fixture.componentRef.setInput('icon', 'eye');
    fixture.componentRef.setInput('state', TaskState.CREATED);
    fixture.componentRef.setInput('taskItems', [
      miniTaskItemData,
      miniTaskItemData,
      miniTaskItemData,
    ]);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a task state', () => {
    const taskStateHtml: HTMLSpanElement =
      fixture.nativeElement.querySelector('#task-state');
    expect(taskStateHtml.innerHTML).toBe(
      `tasks.taskStates.${component.state()}`
    );
  });

  it('should render as app-mini-task as present in taskItems input', () => {
    const appMiniTasksHtml: NodeList =
      fixture.nativeElement.querySelectorAll('app-mini-task');
    expect(appMiniTasksHtml.length).toBe(component.taskItems().length);
  });
});
