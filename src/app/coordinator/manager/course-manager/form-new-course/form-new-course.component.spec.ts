import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNewCourseComponent } from './form-new-course.component';

describe('FormNewCourseComponent', () => {
  let component: FormNewCourseComponent;
  let fixture: ComponentFixture<FormNewCourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormNewCourseComponent]
    });
    fixture = TestBed.createComponent(FormNewCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
