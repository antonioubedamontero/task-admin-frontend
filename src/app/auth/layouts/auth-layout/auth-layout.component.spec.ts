import { ComponentFixture, TestBed } from '@angular/core/testing';

import AuthLayoutComponent from './auth-layout.component';

describe('Auth-layoutComponent', () => {
  let component: AuthLayoutComponent;
  let fixture: ComponentFixture<AuthLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a router-outlet', () => {
    const htmlRouterOutler =
      fixture.nativeElement.querySelector('router-outlet');
    expect(htmlRouterOutler).toBeTruthy();
  });
});
