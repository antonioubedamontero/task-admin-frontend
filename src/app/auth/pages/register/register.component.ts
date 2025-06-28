import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  imports: [TranslateModule],
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RegisterComponent {}
