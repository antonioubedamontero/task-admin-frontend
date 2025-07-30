import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-auth-layout',
  template: `<div id="auth-layout"></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AuthLayoutMockComponent {}
