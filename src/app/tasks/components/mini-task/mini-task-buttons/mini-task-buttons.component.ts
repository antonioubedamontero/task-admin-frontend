import { ChangeDetectionStrategy, Component, output } from '@angular/core';

import { LucideAngularModule } from 'lucide-angular';

import { MiniTaskType } from '../../../interfaces';

@Component({
  selector: 'app-mini-task-buttons',
  imports: [LucideAngularModule],
  templateUrl: './mini-task-buttons.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiniTaskButtonsComponent {
  btnClicked = output<MiniTaskType>();
}
