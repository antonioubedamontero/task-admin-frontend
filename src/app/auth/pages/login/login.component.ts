import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';

import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

import { FormService } from '../../../shared/services';
import { UserService } from '../../services';
import { LoginRequest } from '../../interfaces';
@Component({
  selector: 'app-login',
  imports: [TranslateModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent implements OnDestroy {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private router = inject(Router);

  formService = inject(FormService);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  subscriptions: Subscription[] = [];

  ngOnDestroy(): void {
    // TODO: Review if should avoid
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

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
    const subscription = this.userService.login(userLogin).subscribe({
      next: ({ token }) => {
        if (token) {
          this.router.navigateByUrl('/tasks');
        }
      },
      error: (error) => {
        // TODO: Send modal notification to user
      },
    });

    this.subscriptions.push(subscription);
  }
}
