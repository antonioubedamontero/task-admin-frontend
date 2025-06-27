import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from '../../shared/components/header/header.component';

const components = [HeaderComponent];
@Component({
  selector: 'app-tasks-layout',
  imports: [RouterOutlet, ...components],
  templateUrl: './tasks-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TasksLayoutComponent {}
