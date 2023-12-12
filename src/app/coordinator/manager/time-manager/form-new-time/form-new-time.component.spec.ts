import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNewTimeComponent } from './form-new-time.component';

describe('FormNewTimeComponent', () => {
  let component: FormNewTimeComponent;
  let fixture: ComponentFixture<FormNewTimeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormNewTimeComponent]
    });
    fixture = TestBed.createComponent(FormNewTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
