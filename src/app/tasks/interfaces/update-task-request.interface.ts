import { TaskState } from './task-state.interface';

export interface UpdateTaskRequest {
  taskId: string;
  name?: string;
  currentState: TaskState;
  justification?: string;
  description?: string;
  startDate?: string;
  dueDate?: string;
}
