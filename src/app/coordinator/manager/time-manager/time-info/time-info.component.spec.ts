import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeInfoComponent } from './time-info.component';

describe('TimeInfoComponent', () => {
  let component: TimeInfoComponent;
  let fixture: ComponentFixture<TimeInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimeInfoComponent]
    });
    fixture = TestBed.createComponent(TimeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
