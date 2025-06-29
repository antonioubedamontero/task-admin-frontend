import { inject, Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';

import { catchError, map, Observable, of } from 'rxjs';

import { UserService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class EmailTakenValidator implements AsyncValidator {
  private readonly userService = inject(UserService);

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;
    return this.userService.getUserAvailability(email).pipe(
      map(({ isAvailable }) => (isAvailable ? null : { emailTaken: true })),
      catchError(() => of(null))
    );
  }
}
