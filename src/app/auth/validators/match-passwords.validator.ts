import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const matchPasswordsValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const repeatPassword = control.get('repeatPassword')?.value;

  if (!password || !repeatPassword) return null;

  return password === repeatPassword ? null : { distinctPasswd: true };
};
