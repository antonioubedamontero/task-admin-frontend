import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { FormService, MessageService } from '../../../shared/services';
import { UserService } from '../../services';
import { LoginRequest } from '../../interfaces';
import { ModalUserFeedbackComponent } from '../../../shared/components/modal-user-feedback/modal-user-feedback.component';
import { ModelUserFeedbackType } from '../../../shared/interfaces';
@Component({
  selector: 'app-login',
  imports: [
    TranslateModule,
    ReactiveFormsModule,
    ModalUserFeedbackComponent,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private router = inject(Router);
  private translate = inject(TranslateService);
  private destroyRef = inject(DestroyRef);
  formService = inject(FormService);
  messageService = inject(MessageService);

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
          const title = this.translate.instant(
            'modalUserFeedback.defaultErrorTitle'
          );
          const message = errorResponse.error.message;
          this.messageService.showModal(
            title,
            message,
            ModelUserFeedbackType.ERROR
          );
        },
      });
  }
}
