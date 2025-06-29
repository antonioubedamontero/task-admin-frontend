import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { FormService } from '../../services';

@Component({
  selector: 'app-login',
  imports: [TranslateModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent {
  private fb = inject(FormBuilder);
  formService = inject(FormService);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  submitLogin(): void {
    if (this.loginForm.errors) {
      this.loginForm.markAllAsTouched();
      return;
    }

    // TODO: Process valid login request
    console.log('form data', this.loginForm.value);
  }
}
