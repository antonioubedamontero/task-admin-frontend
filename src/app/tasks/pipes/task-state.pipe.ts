import { inject, Pipe, type PipeTransform } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'taskState',
})
export class TaskStatePipe implements PipeTransform {
  translate = inject(TranslateService);

  transform(value: string): string {
    return this.translate.instant(`taskStates.${value}`);
  }
}
