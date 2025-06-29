import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

import { FormService } from '../../../shared/services';
import { EmailTakenValidator, matchPasswordsValidator } from '../../validators';
import { UserService } from '../../services';
import { RegisterRequest } from '../../interfaces';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  imports: [TranslateModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RegisterComponent implements OnDestroy {
  private fb = inject(FormBuilder);
  private emailTakenValidator = inject(EmailTakenValidator);
  private userService = inject(UserService);
  private router = inject(Router);

  formService = inject(FormService);

  private subscriptions: Subscription[] = [];

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

  ngOnDestroy(): void {
    // TODO: View if can avoid this life cycle hook
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  submitRegister(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    // TODO: Process valid register request
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
    const subscription = this.userService.register(newUser).subscribe({
      next: (resp) => this.router.navigateByUrl('/tasks'),
      error: (err) => console.error('Error registering user'),
    });

    this.subscriptions.push(subscription);
  }
}
