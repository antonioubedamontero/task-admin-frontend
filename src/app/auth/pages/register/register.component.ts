import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { FormService } from '../../../shared/services';
import { EmailTakenValidator, matchPasswordsValidator } from '../../validators';
import { UserService } from '../../services';
import { RegisterRequest } from '../../interfaces';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-register',
  imports: [TranslateModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RegisterComponent {
  private fb = inject(FormBuilder);
  private emailTakenValidator = inject(EmailTakenValidator);
  private userService = inject(UserService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  formService = inject(FormService);

  registerForm = this.fb.group(
    {
      email: [
        '',
        [Validators.required, Validators.email],
        this.emailTakenValidator.validate.bind(this.emailTakenValidator),
      ],
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      password: ['', [Validators.required]],
      repeatPassword: ['', [Validators.required]],
    },
    { validators: matchPasswordsValidator }
  );

  submitRegister(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const { email, name, surname, password } = this.registerForm.value;
    const registerReq: RegisterRequest = {
      email: email!,
      name: name!,
      surname: surname!,
      password: password!,
    };
    this.sendRegisterRequest(registerReq);
  }

  sendRegisterRequest(newUser: RegisterRequest): void {
    // TODO: Show dialog message if error produced
    this.userService
      .register(newUser)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => this.router.navigateByUrl('/tasks'),
        error: (error) => console.error('Error registering user'),
      });
  }
}
