import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { FormService, MessageService } from '../../../shared/services';
import { EmailTakenValidator, matchPasswordsValidator } from '../../validators';
import { UserService } from '../../services';
import { RegisterRequest } from '../../interfaces';
import { ModelUserFeedbackType } from '../../../shared/interfaces';
import { ModalUserFeedbackComponent } from '../../../shared/components/modal-user-feedback/modal-user-feedback.component';
@Component({
  selector: 'app-register',
  imports: [
    TranslateModule,
    ReactiveFormsModule,
    RouterLink,
    ModalUserFeedbackComponent,
  ],
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RegisterComponent {
  modelUserFeedbackType = ModelUserFeedbackType;

  private fb = inject(FormBuilder);
  private emailTakenValidator = inject(EmailTakenValidator);
  private userService = inject(UserService);
  private router = inject(Router);
  private translate = inject(TranslateService);
  private destroyRef = inject(DestroyRef);
  formService = inject(FormService);
  messageService = inject(MessageService);

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
    this.userService
      .register(newUser)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => this.router.navigateByUrl('/tasks'),
        error: (errorResponse) => {
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
