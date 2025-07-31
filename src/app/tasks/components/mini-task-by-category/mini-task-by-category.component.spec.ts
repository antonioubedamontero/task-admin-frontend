import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniTaskByCategoryComponent } from './mini-task-by-category.component';

describe('MiniTaskByCategoryComponent', () => {
  let component: MiniTaskByCategoryComponent;
  let fixture: ComponentFixture<MiniTaskByCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MiniTaskByCategoryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MiniTaskByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
