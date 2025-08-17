import { ComponentFixture, TestBed } from '@angular/core/testing';
import { importProvidersFrom } from '@angular/core';

import { Eye, LucideAngularModule, Pencil, Trash } from 'lucide-angular';

import { MiniTaskButtonsComponent } from './mini-task-buttons.component';

const lucideIcons = {
  Eye,
  Pencil,
  Trash,
};

describe('MiniTaskButtonsComponent', () => {
  let component: MiniTaskButtonsComponent;
  let fixture: ComponentFixture<MiniTaskButtonsComponent>;
  let htmlButtons: NodeList;
  let htmlButtonsList: HTMLButtonElement[] = [];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LucideAngularModule, MiniTaskButtonsComponent],
      providers: [
        importProvidersFrom(LucideAngularModule.pick({ ...lucideIcons })),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MiniTaskButtonsComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('- should have a button container', () => {
    let clickedButtonEmmited: string;

    beforeEach(() => {
      htmlButtons = fixture.nativeElement.querySelectorAll('div button');
      htmlButtonsList = Array.from(htmlButtons) as HTMLButtonElement[];
      component.btnClicked.subscribe((value) => (clickedButtonEmmited = value));
    });

    it('with a view, edit and delete buttons', () => {
      expect(htmlButtons.length).toBe(3);
    });

    it('should emit view when click on view button', (done) => {
      const viewButton = htmlButtonsList[0];
      viewButton.click();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(clickedButtonEmmited).toBe('view');
        done();
      });
    });

    it('should emit edit when click on edit button', (done) => {
      const editButton = htmlButtonsList[1];
      editButton.click();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(clickedButtonEmmited).toBe('edit');
        done();
      });
    });

    it('should emit delete when click on delete button', (done) => {
      const deleteButton = htmlButtonsList[2];
      deleteButton.click();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(clickedButtonEmmited).toBe('delete');
        done();
      });
    });
  });
});
