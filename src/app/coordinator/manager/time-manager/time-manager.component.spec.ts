import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeManagerComponent } from './time-manager.component';

describe('TimeManagerComponent', () => {
  let component: TimeManagerComponent;
  let fixture: ComponentFixture<TimeManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimeManagerComponent]
    });
    fixture = TestBed.createComponent(TimeManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
