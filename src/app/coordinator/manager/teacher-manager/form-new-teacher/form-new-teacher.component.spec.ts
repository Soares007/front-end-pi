import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNewTeacherComponent } from './form-new-teacher.component';

describe('FormNewTeacherComponent', () => {
  let component: FormNewTeacherComponent;
  let fixture: ComponentFixture<FormNewTeacherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormNewTeacherComponent]
    });
    fixture = TestBed.createComponent(FormNewTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
