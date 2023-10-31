import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginCoordinatorComponent } from './login-coordinator.component';

describe('LoginCoordinatorComponent', () => {
  let component: LoginCoordinatorComponent;
  let fixture: ComponentFixture<LoginCoordinatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginCoordinatorComponent]
    });
    fixture = TestBed.createComponent(LoginCoordinatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
