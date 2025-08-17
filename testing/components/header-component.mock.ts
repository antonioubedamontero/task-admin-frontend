import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponentMock {
  logout(): void {}
}
