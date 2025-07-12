import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import {
  DeleteResponse,
  NewTaskRequest,
  TaskResponse,
  TasksResponse,
  TaskState,
} from '../interfaces';
import { environment } from '../../../environments/environment';

const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private http = inject(HttpClient);

  addNewTask(newTask: NewTaskRequest): Observable<TaskResponse> {
    return this.http.post<TaskResponse>(`${BASE_URL}/tasks`, newTask);
  }

  getTasks(): Observable<TasksResponse> {
    return this.http.get<TasksResponse>(`${BASE_URL}/tasks`);
  }

  getTasksByState(state: TaskState): Observable<TasksResponse> {
    return this.http.get<TasksResponse>(`${BASE_URL}/tasks/state/${state}`);
  }

  deleteTask(taskId: string): Observable<DeleteResponse> {
    return this.http.delete<DeleteResponse>(`${BASE_URL}/tasks/${taskId}`);
  }
}
