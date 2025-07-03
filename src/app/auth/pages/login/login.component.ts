import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { FormService } from '../../../shared/services';
import { UserService } from '../../services';
import { LoginRequest } from '../../interfaces';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-login',
  imports: [TranslateModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  formService = inject(FormService);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  submitLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;
    if (!email || !password) return;

    const loginRequest: LoginRequest = { email, password };
    this.sendLoginRequest(loginRequest);
  }

  sendLoginRequest(userLogin: LoginRequest): void {
    this.userService
      .login(userLogin)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: ({ token }) => {
          if (token) {
            this.router.navigateByUrl('/tasks');
          }
        },
        error: (error) => {
          // TODO: Send modal notification to user
        },
      });
  }
}
