import { importProvidersFrom } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  CircleAlert,
  CircleCheck,
  CircleX,
  LucideAngularModule,
} from 'lucide-angular';
import { TranslateService } from '@ngx-translate/core';

import { ModalUserFeedbackComponent } from './modal-user-feedback.component';
import { TranslateServiceMock } from '../../../../../testing/services/translate-service.mock';
import { ModelUserFeedbackType } from '../../interfaces';

const lucideIcons = {
  CircleX,
  CircleAlert,
  CircleCheck,
};

fdescribe('ModalUserFeedbackComponent', () => {
  let component: ModalUserFeedbackComponent;
  let fixture: ComponentFixture<ModalUserFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LucideAngularModule, ModalUserFeedbackComponent],
      providers: [
        importProvidersFrom(LucideAngularModule.pick({ ...lucideIcons })),
        { provide: TranslateService, useClass: TranslateServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalUserFeedbackComponent);
    fixture.componentRef.setInput('modalType', ModelUserFeedbackType.success);
    fixture.componentRef.setInput('title', 'mock title');
    fixture.componentRef.setInput('description', 'mock description');
    fixture.componentRef.setInput('buttonText', 'mock button text');

    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a title', () => {
    const htmlTitle: HTMLParagraphElement =
      fixture.nativeElement.querySelector('#title');
    expect(htmlTitle.nodeValue).toBe(component.title());
  });

  it('should render a description', () => {
    const htmlDescription: HTMLParagraphElement =
      fixture.nativeElement.querySelector('#description');
    expect(htmlDescription.nodeValue).toBe(component.description());
  });

  it('should render a button', () => {
    const htmlButton: HTMLButtonElement =
      fixture.nativeElement.querySelector('button');
    expect(htmlButton.value).toBe(component.buttonText());
  });

  it('should emit true when close method is called', () => {
    const closeEmmisionSpy = spyOn(
      component.closeModal,
      'emit'
    ).and.callThrough();
    component.close();
    expect(closeEmmisionSpy).toBeTruthy();
  });

  describe('- textModalIconAndColor', () => {
    it('should return color and icon for error type', () => {
      const expected = {
        color: 'text-red-500',
        icon: 'circle-x',
      };
      fixture.componentRef.setInput('modalType', ModelUserFeedbackType.ERROR);
      fixture.detectChanges();
      expect(component.textModalIconAndColor).toEqual(expected);
    });

    it('should return color and icon for warning type', () => {
      const expected = {
        color: 'text-orange-300',
        icon: 'circle-alert',
      };
      fixture.componentRef.setInput('modalType', ModelUserFeedbackType.WARNING);
      fixture.detectChanges();
      expect(component.textModalIconAndColor).toEqual(expected);
    });

    it('should return color and icon for success type', () => {
      const expected = {
        color: 'text-lime-500',
        icon: 'circle-check',
      };
      fixture.componentRef.setInput('modalType', ModelUserFeedbackType.success);
      fixture.detectChanges();
      expect(component.textModalIconAndColor).toEqual(expected);
    });

    it('should throw an error if textModalIconAndColor has another value', () => {
      try {
        fixture.componentRef.setInput('modalType', 'wrongModalTypeValue');
        fixture.detectChanges();
      } catch (error) {
        expect(error).toBe('TextModalIconAndColor is undefined');
      }
    });
  });
});
