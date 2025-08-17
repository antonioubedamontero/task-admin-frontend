import { TaskResponseItem, TaskState } from '../../src/app/tasks/interfaces';

export const taskData1: TaskResponseItem = {
  _id: '688c4f69b76bab8751fcd583',
  name: 'Task 1',
  description: 'Task desc 1',
  currentState: TaskState.PAUSED,
  logStates: [
    {
      startDate: '2025-08-01T05:23:53.617Z',
      state: TaskState.CREATED,
      justification: '',
      endDate: '2025-08-01T05:25:26.756Z',
    },
    {
      startDate: '2025-08-01T05:25:26.756Z',
      state: TaskState.STARTED,
      endDate: '2025-08-01T05:25:54.343Z',
      justification: 'Fill dates',
    },
    {
      startDate: '2025-08-01T05:25:54.344Z',
      state: TaskState.PAUSED,
      endDate: null,
      justification: 'Backend block',
    },
  ],
  createdAt: '2025-08-01T05:23:53.620Z',
  updatedAt: '2025-08-01T05:25:54.346Z',
  dueDate: '2025-08-27T12:30:00.000Z',
  startDate: '2025-08-01T07:00:00.000Z',
};

export const taskData2: TaskResponseItem = {
  _id: '688c4f7ab76bab8751fcd58b',
  name: 'Task 2',
  description: 'Desc 2',
  currentState: TaskState.ENDED,
  logStates: [
    {
      startDate: '2025-08-01T05:24:10.845Z',
      state: TaskState.CREATED,
      justification: '',
      endDate: '2025-08-01T05:26:51.441Z',
    },
    {
      startDate: '2025-08-01T05:26:51.441Z',
      state: TaskState.STARTED,
      endDate: '2025-08-01T05:28:17.888Z',
      justification: 'Fill dates',
    },
    {
      startDate: '2025-08-01T05:28:17.888Z',
      state: TaskState.ENDED,
      endDate: null,
      justification: 'Completed',
    },
  ],
  createdAt: '2025-08-01T05:24:10.847Z',
  updatedAt: '2025-08-01T05:28:17.890Z',
  dueDate: '2025-08-18T10:00:00.000Z',
  startDate: '2025-08-11T07:30:00.000Z',
};

export const taskData3: TaskResponseItem = {
  _id: '688c4f8db76bab8751fcd593',
  name: 'Task 3',
  description: 'Desc task 3',
  currentState: TaskState.CREATED,
  logStates: [
    {
      startDate: '2025-08-01T05:24:29.266Z',
      state: TaskState.CREATED,
      justification: '',
    },
  ],
  createdAt: '2025-08-01T05:24:29.268Z',
  updatedAt: '2025-08-01T05:24:29.268Z',
};

export const taskData4: TaskResponseItem = {
  _id: '688c4f9bb76bab8751fcd59b',
  name: 'Task 4',
  description: 'Desc task 4',
  currentState: TaskState.STARTED,
  logStates: [
    {
      startDate: '2025-08-01T05:24:43.315Z',
      state: TaskState.CREATED,
      justification: '',
      endDate: '2025-08-01T05:27:53.503Z',
    },
    {
      startDate: '2025-08-01T05:27:53.503Z',
      state: TaskState.STARTED,
      endDate: null,
      justification: 'Fill dates',
    },
  ],
  createdAt: '2025-08-01T05:24:43.317Z',
  updatedAt: '2025-08-01T05:27:53.505Z',
  dueDate: '2025-08-29T11:00:00.000Z',
  startDate: '2025-08-25T07:00:00.000Z',
};

export const tasksData = [taskData1, taskData2, taskData3, taskData4];
