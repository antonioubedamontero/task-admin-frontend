import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable, tap } from 'rxjs';

import {
  DeleteResponse,
  NewTaskRequest,
  TaskResponse,
  TasksResponse,
  TaskState,
  UpdateTaskRequest,
} from '../interfaces';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../auth/services';

const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  addNewTask(newTask: NewTaskRequest): Observable<TaskResponse> {
    return this.http
      .post<TaskResponse>(`${BASE_URL}/tasks`, newTask)
      .pipe(tap((resp) => this.authService.saveTokenToStorage(resp.token)));
  }

  getTasks(): Observable<TasksResponse> {
    return this.http
      .get<TasksResponse>(`${BASE_URL}/tasks`)
      .pipe(tap((resp) => this.authService.saveTokenToStorage(resp.token)));
  }

  getTaskById(id: string): Observable<TaskResponse> {
    return this.http
      .get<TaskResponse>(`${BASE_URL}/tasks/${id}`)
      .pipe(tap((resp) => this.authService.saveTokenToStorage(resp.token)));
  }

  getTasksByState(state: TaskState): Observable<TasksResponse> {
    return this.http
      .get<TasksResponse>(`${BASE_URL}/tasks/state/${state}`)
      .pipe(tap((resp) => this.authService.saveTokenToStorage(resp.token)));
  }

  updateTask(updateTaskRequest: UpdateTaskRequest): Observable<TaskResponse> {
    return this.http
      .patch<TaskResponse>(`${BASE_URL}/tasks`, updateTaskRequest)
      .pipe(tap((resp) => this.authService.saveTokenToStorage(resp.token)));
  }

  deleteTask(taskId: string): Observable<DeleteResponse> {
    return this.http
      .delete<DeleteResponse>(`${BASE_URL}/tasks/${taskId}`)
      .pipe(tap((resp) => this.authService.saveTokenToStorage(resp.token)));
  }
}
