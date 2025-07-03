import { ChangeDetectionStrategy, Component } from '@angular/core';

import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-mini-task-buttons',
  imports: [LucideAngularModule],
  templateUrl: './mini-task-buttons.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiniTaskButtonsComponent {}
