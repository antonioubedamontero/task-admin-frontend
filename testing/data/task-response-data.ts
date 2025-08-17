import {
  LogStateResponse,
  TaskResponse,
  TaskResponseItem,
  TaskState,
} from '../../src/app/tasks/interfaces';

export const logStateResponseData1: LogStateResponse = {
  startDate: new Date().toString(),
  endDate: new Date().toString(),
  state: TaskState.CREATED,
  justification: 'justification',
};

export const taskResponseItemData: TaskResponseItem = {
  _id: 'ABC123',
  name: 'task',
  description: 'task description',
  startDate: new Date().toString(),
  dueDate: new Date().toString(),
  logStates: [logStateResponseData1],
  currentState: TaskState.CREATED,
  createdAt: new Date().toString(),
  updatedAt: new Date().toString(),
};

export const taskResponseData: TaskResponse = {
  task: taskResponseItemData,
  token: 'ABC123',
};
