import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';
import {
  DeleteResponse,
  NewTaskRequest,
  TaskResponse,
  TasksResponse,
  TaskState,
  UpdateTaskRequest,
} from '../interfaces';
import {
  taskData1,
  taskData2,
  tasksData,
} from '../../../../testing/data/task-data';
import { environment } from '../../../environments/environment';

const BASE_URL = environment.BASE_URL;

describe('TaskService', () => {
  let service: TaskService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(TaskService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call endpoint to add a new task', (done) => {
    const newTaskResponse: TaskResponse = {
      task: { ...taskData1 },
      token: 'ABC',
    };

    const newTask: NewTaskRequest = {
      name: 'new task',
      description: 'new description',
    };
    service.addNewTask(newTask).subscribe((taskResponse) => {
      expect(taskResponse).toEqual(newTaskResponse);
      done();
    });

    httpTesting
      .expectOne({
        method: 'POST',
        url: `${BASE_URL}/tasks`,
      })
      .flush(newTaskResponse);
  });

  it('should call endpoint to get all tasks', (done) => {
    const tasksResponse: TasksResponse = {
      tasks: [...tasksData],
      token: 'ABC',
    };

    service.getTasks().subscribe((tasks) => {
      expect(tasks).toEqual(tasksResponse);
      done();
    });

    httpTesting
      .expectOne({
        method: 'GET',
        url: `${BASE_URL}/tasks`,
      })
      .flush(tasksResponse);
  });

  it('should call endpoint to get task by id', (done) => {
    const taskResponse: TaskResponse = {
      task: { ...taskData1 },
      token: 'ABC',
    };

    service.getTaskById('688c4f69b76bab8751fcd583').subscribe((task) => {
      expect(task).toEqual(taskResponse);
      done();
    });

    httpTesting
      .expectOne({
        method: 'GET',
        url: `${BASE_URL}/tasks/688c4f69b76bab8751fcd583`,
      })
      .flush(taskResponse);
  });

  it('should call endpoint to get task by state', (done) => {
    const tasksResponse: TasksResponse = {
      tasks: [{ ...taskData2 }],
      token: 'ABC',
    };
    service.getTasksByState(TaskState.ENDED).subscribe((tasks) => {
      expect(tasks).toEqual(tasksResponse);
      done();
    });

    httpTesting
      .expectOne({
        method: 'GET',
        url: `${BASE_URL}/tasks/state/${TaskState.ENDED}`,
      })
      .flush(tasksResponse);
  });

  it('should call endpoint to update task', (done) => {
    const taskResponse: TaskResponse = {
      task: { ...taskData2 },
      token: 'ABC',
    };

    const updateTaskRequest: UpdateTaskRequest = {
      taskId: '688c4f7ab76bab8751fcd58b',
      currentState: TaskState.ENDED,
    };

    service.updateTask(updateTaskRequest).subscribe((task) => {
      expect(task).toEqual(taskResponse);
      done();
    });

    httpTesting
      .expectOne({
        method: 'PATCH',
        url: `${BASE_URL}/tasks`,
      })
      .flush(taskResponse);
  });

  it('should call endpoint to delete task', (done) => {
    const deleteResponse: DeleteResponse = {
      message: 'task delete successfully',
      token: 'ABC',
    };

    service.deleteTask('688c4f7ab76bab8751fcd58b').subscribe((resp) => {
      expect(resp).toEqual(deleteResponse);
      done();
    });

    httpTesting
      .expectOne({
        method: 'DELETE',
        url: `${BASE_URL}/tasks/688c4f7ab76bab8751fcd58b`,
      })
      .flush(deleteResponse);
  });
});
