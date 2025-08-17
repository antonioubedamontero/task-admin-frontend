import { inject, Injectable } from '@angular/core';

import { Observable, of, tap } from 'rxjs';

import {
  DeleteResponse,
  NewTaskRequest,
  TaskResponse,
  TasksResponse,
  TaskState,
  UpdateTaskRequest,
} from '../../src/app/tasks/interfaces';
import {
  deleteResponseData,
  taskResponseData,
  tasksResponseData,
} from '../data';
import { AuthServiceMock } from './auth-service.mock';

@Injectable({
  providedIn: 'root',
})
export class TaskServiceMock {
  authService = inject(AuthServiceMock);

  addNewTask(newTask: NewTaskRequest): Observable<TaskResponse> {
    return of(taskResponseData).pipe(
      tap((resp) => this.authService.saveTokenToStorage(resp.token))
    );
  }

  getTasks(): Observable<TasksResponse> {
    return of(tasksResponseData).pipe(
      tap((resp) => this.authService.saveTokenToStorage(resp.token))
    );
  }

  getTaskById(id: string): Observable<TaskResponse> {
    return of(taskResponseData).pipe(
      tap((resp) => this.authService.saveTokenToStorage(resp.token))
    );
  }

  getTasksByState(state: TaskState): Observable<TasksResponse> {
    return of(tasksResponseData).pipe(
      tap((resp) => this.authService.saveTokenToStorage(resp.token))
    );
  }

  updateTask(updateTaskRequest: UpdateTaskRequest): Observable<TaskResponse> {
    return of(taskResponseData).pipe(
      tap((resp) => this.authService.saveTokenToStorage(resp.token))
    );
  }

  deleteTask(taskId: string): Observable<DeleteResponse> {
    return of(deleteResponseData).pipe(
      tap((resp) => this.authService.saveTokenToStorage(resp.token))
    );
  }
}
