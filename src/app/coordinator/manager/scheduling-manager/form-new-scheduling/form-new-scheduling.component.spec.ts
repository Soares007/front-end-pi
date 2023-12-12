import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNewSchedulingComponent } from './form-new-scheduling.component';

describe('FormNewSchedulingComponent', () => {
  let component: FormNewSchedulingComponent;
  let fixture: ComponentFixture<FormNewSchedulingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormNewSchedulingComponent]
    });
    fixture = TestBed.createComponent(FormNewSchedulingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
