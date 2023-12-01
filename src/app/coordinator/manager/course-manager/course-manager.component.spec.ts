import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseManagerComponent } from './course-manager.component';

describe('CourseManagerComponent', () => {
  let component: CourseManagerComponent;
  let fixture: ComponentFixture<CourseManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseManagerComponent]
    });
    fixture = TestBed.createComponent(CourseManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
