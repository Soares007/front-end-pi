import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherManagerComponent } from './teacher-manager.component';

describe('TeacherManagerComponent', () => {
  let component: TeacherManagerComponent;
  let fixture: ComponentFixture<TeacherManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherManagerComponent]
    });
    fixture = TestBed.createComponent(TeacherManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
