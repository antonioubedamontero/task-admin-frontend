import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniTaskButtonsComponent } from './mini-task-buttons.component';

describe('MiniTaskButtonsComponent', () => {
  let component: MiniTaskButtonsComponent;
  let fixture: ComponentFixture<MiniTaskButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MiniTaskButtonsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MiniTaskButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
