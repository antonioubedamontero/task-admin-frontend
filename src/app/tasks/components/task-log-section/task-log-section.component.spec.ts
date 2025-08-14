import { ComponentFixture, TestBed } from '@angular/core/testing';
import { importProvidersFrom } from '@angular/core';

import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  Album,
  ChevronDown,
  ChevronUp,
  LucideAngularModule,
} from 'lucide-angular';

import { TaskLogSectionComponent } from './task-log-section.component';
import {
  TaskStatePipeMock,
  TranslatePipeMock,
} from '../../../../../testing/pipes';
import { TranslateServiceMock } from '../../../../../testing/services';
import { logStateResponseData1 } from '../../../../../testing/data';

describe('TaskLogSectionComponent', () => {
  let component: TaskLogSectionComponent;
  let fixture: ComponentFixture<TaskLogSectionComponent>;

  const lucideIcons = {
    ChevronDown,
    ChevronUp,
    Album,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LucideAngularModule,
        TaskStatePipeMock,
        TaskLogSectionComponent,
      ],
      providers: [
        importProvidersFrom(LucideAngularModule.pick({ ...lucideIcons })),
        { provide: TranslateService, useClass: TranslateServiceMock },
      ],
    })
      .overrideComponent(TaskLogSectionComponent, {
        remove: {
          imports: [TranslateModule],
        },
        add: {
          imports: [TranslatePipeMock],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(TaskLogSectionComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('logStates', [
      logStateResponseData1,
      logStateResponseData1,
      logStateResponseData1,
    ]);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render task log details hidden by default', () => {
    const taskLogDetailsHtml =
      fixture.nativeElement.querySelector('#task-log-details');
    expect(component.isLogDetailsOpen()).toBeFalsy();
    expect(taskLogDetailsHtml).toBeFalsy();
  });

  it('should render task log details when click on button', () => {
    const toggleButton: HTMLButtonElement = fixture.nativeElement.querySelector(
      '#toggle-task-details'
    );
    toggleButton.click();
    fixture.detectChanges();

    const taskLogDetailsHtml: HTMLCollection =
      fixture.nativeElement.querySelector('#task-log-details');
    expect(taskLogDetailsHtml).toBeTruthy();

    const taskLogDetailsHtmlElements =
      fixture.nativeElement.querySelectorAll('td');
    console.log('data', taskLogDetailsHtmlElements);
    expect(taskLogDetailsHtmlElements.length).toBe(
      component.logStates().length * 4
    );
  });
});
