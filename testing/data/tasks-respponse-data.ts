import { TasksResponse } from '../../src/app/tasks/interfaces';
import { taskResponseItemData } from './task-response-data';

export const tasksResponseData: TasksResponse = {
  tasks: [taskResponseItemData],
  token: 'ABC123',
};
