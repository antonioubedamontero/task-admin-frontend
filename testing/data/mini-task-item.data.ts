import { MiniTaskItem } from '../../src/app/tasks/interfaces';

export const miniTaskItemData: MiniTaskItem = {
  _id: 'ABC123',
  title: 'Mock title',
  startDate: new Date().toLocaleString(),
  dueDate: new Date().toLocaleString(),
  description: 'mock description',
};
