import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniTaskComponent } from './mini-task.component';

describe('MiniTaskComponent', () => {
  let component: MiniTaskComponent;
  let fixture: ComponentFixture<MiniTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MiniTaskComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MiniTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
