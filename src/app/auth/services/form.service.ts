import { Injectable } from '@angular/core';

import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  hasControlErrors(form: FormGroup, controlName: string): boolean {
    return !!form.get(controlName)?.errors;
  }

  getFormControlErrors(form: FormGroup, controlName: string): string {
    const control = form.get(controlName);

    if (!control || !control.errors) {
      return '';
    }

    let errors: string = '';
    Object.keys(control.errors).forEach((errorName) => {
      errors.concat(`\n${control.errors![errorName]}`);
    });

    return errors;
  }
}
