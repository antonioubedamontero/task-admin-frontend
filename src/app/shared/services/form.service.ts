import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';
@Injectable({
  providedIn: 'root',
})
export class FormService {
  translate = inject(TranslateService);

  hasControlErrors(form: FormGroup, controlName: string): boolean {
    const control = form.get(controlName);
    return !!control && !!control.errors && control.touched;
  }

  getFormControlErrors(form: FormGroup, controlName: string): string {
    const control = form.get(controlName);

    if (!control || !control.errors) {
      return '';
    }

    let errors: string[] = [];
    Object.keys(control.errors).forEach((errorKey) => {
      const genericError = this.translate.instant('errors.other');
      const error = this.translate.instant(`errors.${errorKey}`);
      errors.push(error ?? genericError);
    });

    return errors.join('\n');
  }
}
