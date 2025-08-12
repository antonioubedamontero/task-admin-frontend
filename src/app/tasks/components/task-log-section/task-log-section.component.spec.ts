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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
