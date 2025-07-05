import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { TranslateModule } from '@ngx-translate/core';

import { FormService } from '../../../shared/services';
import { UserService } from '../../services';
import { LoginRequest } from '../../interfaces';
import { ModalUserFeedbackComponent } from '../../../shared/components/modal-user-feedback/modal-user-feedback.component';
import { ModelUserFeedbackType } from '../../../shared/interfaces';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-login',
  imports: [TranslateModule, ReactiveFormsModule, ModalUserFeedbackComponent],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent {
  modelUserFeedbackType = ModelUserFeedbackType;

  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  formService = inject(FormService);

  isErrorModal = signal<boolean>(false);
  errorText = signal<string>('');

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
        error: (errorResponse: HttpErrorResponse) => {
          this.isErrorModal.set(true);
          this.errorText.set(errorResponse.error.message);
        },
      });
  }

  closeModal(): void {
    this.isErrorModal.set(false);
    this.errorText.set('');
  }
}
