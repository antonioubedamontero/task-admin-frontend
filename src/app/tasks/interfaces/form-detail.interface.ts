import { TaskState } from './task-state.interface';

export interface FormDetail {
  _id: string;
  name: string;
  description: string;
  currentState: TaskState;
  justification: string;
  startDate: string;
  startTime: string;
  dueDate: string;
  dueTime: string;
}
