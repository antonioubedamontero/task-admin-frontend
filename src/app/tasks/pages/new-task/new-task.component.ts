import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { headerTitle$ } from '../../components/header/header.component';

@Component({
  selector: 'app-new-task',
  imports: [TranslateModule],
  templateUrl: './new-task.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NewTaskComponent implements OnInit {
  translate = inject(TranslateService);

  ngOnInit(): void {
    // TODO: Try to avoid this life cycle
    const headerTitle = this.translate.instant('newTask.title');
    headerTitle$.next(headerTitle);
  }
}
