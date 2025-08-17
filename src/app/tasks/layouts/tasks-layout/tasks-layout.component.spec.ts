import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import TasksLayoutComponent from './tasks-layout.component';
import { HeaderComponentMock } from '../../../../../testing/components';
import { HeaderComponent } from '../../components/header/header.component';

describe('TasksLayoutComponent', () => {
  let component: TasksLayoutComponent;
  let fixture: ComponentFixture<TasksLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksLayoutComponent],
      providers: [
        provideRouter([
          {
            path: 'tasks',
            loadComponent: () =>
              import(
                '../../../../../testing/components/task-layout.component.mock'
              ),
            children: [],
          },
        ]),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    })
      .overrideComponent(TasksLayoutComponent, {
        remove: {
          imports: [HeaderComponent],
        },
        add: {
          imports: [HeaderComponentMock],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(TasksLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a router outlet', () => {
    const htmlRouterOutlet =
      fixture.nativeElement.querySelector('router-outlet');
    expect(htmlRouterOutlet).toBeTruthy();
  });
});
