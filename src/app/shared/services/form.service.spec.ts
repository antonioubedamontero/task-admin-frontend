import { TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';

import { FormService } from './form.service';
import { TranslateServiceMock } from '../../../../testing/services';

describe('FormService', () => {
  let service: FormService;
  let fb: FormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        { provide: TranslateService, useClass: TranslateServiceMock },
      ],
    });
    service = TestBed.inject(FormService);
    fb = TestBed.inject(FormBuilder);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('- hasControlErrors', () => {
    it('should return true if a control has errors', () => {
      const myForm = fb.group({
        myField: [null, [Validators.required]],
      });
      myForm.get('myField')?.markAsTouched();

      const fieldHasErrors = service.hasControlErrors(myForm, 'myField');
      expect(fieldHasErrors).toBeTruthy();
    });

    it('should return false if a control has not errors', () => {
      const myForm = fb.group({
        myField: ['mock data', [Validators.required]],
      });
      myForm.get('myField')?.markAsTouched();

      const fieldHasErrors = service.hasControlErrors(myForm, 'myField');
      expect(fieldHasErrors).toBeFalsy();
    });
  });

  describe('- getFormControlErrors', () => {
    it('should get errors if form field has errors', () => {
      const myForm = fb.group({
        myField: [null, [Validators.required]],
      });
      myForm.get('myField')?.markAsTouched();

      const fieldHasErrors = service.hasControlErrors(myForm, 'myField');
      expect(fieldHasErrors).toBeTruthy();
      const fieldErrors = service.getFormControlErrors(myForm, 'myField');
      expect(fieldErrors.length).toBeGreaterThan(0);
    });

    it('should get and empty string if form field has not errors', () => {
      const myForm = fb.group({
        myField: ['mock data', [Validators.required]],
      });
      myForm.get('myField')?.markAsTouched();

      const fieldHasErrors = service.hasControlErrors(myForm, 'myField');
      expect(fieldHasErrors).toBeFalsy();
      const controlErrors = service.getFormControlErrors(myForm, 'myField');
      expect(controlErrors).toBe('');
    });
  });
});
