import { TaskState } from './task-state.interface';

export interface TaskResponse {
  task: TaskResponseItem;
  token: string;
}
export interface TasksResponse {
  tasks: TaskResponseItem[];
  token: string;
}

export interface TaskResponseItem {
  _id: string;
  name: string;
  description: string;
  startDate?: string;
  dueDate?: string;
  logStates: LogStateResponse[];
  currentState: TaskState;
  createdAt: string;
  updatedAt: string;
}

export interface LogStateResponse {
  startDate: string;
  endDate?: string;
  state: TaskState;
  justification: string;
}
