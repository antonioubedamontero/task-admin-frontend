import { MiniTaskType } from './mini-task-btn.type';
import { MiniTaskItem } from './mini-task-item.interface';

export interface MiniTaskActionResponse {
  action: MiniTaskType;
  miniTaskItem: MiniTaskItem;
}
