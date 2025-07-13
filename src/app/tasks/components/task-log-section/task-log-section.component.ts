import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
} from '@angular/core';

import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';

import { LogStateResponse } from '../../interfaces';
import { FormatDateService } from '../../services';
import { TaskStatePipe } from '../../pipes/task-state.pipe';

@Component({
  selector: 'app-task-log-section',
  imports: [TranslateModule, LucideAngularModule, TaskStatePipe],
  templateUrl: './task-log-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskLogSectionComponent {
  logStates = input<LogStateResponse[]>([]);

  translate = inject(TranslateService);
  formatDateService = inject(FormatDateService);

  isLogDetailsOpen = signal<boolean>(false);
  chevronIsOpenButton = signal<string>('chevron-down');

  toggleIsLogOpen(): void {
    this.isLogDetailsOpen.update((isOpen) => !isOpen);

    if (this.isLogDetailsOpen()) {
      this.chevronIsOpenButton.set('chevron-up');
      return;
    }

    this.chevronIsOpenButton.set('chevron-down');
  }
}
