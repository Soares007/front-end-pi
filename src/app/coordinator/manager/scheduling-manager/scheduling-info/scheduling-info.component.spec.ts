import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulingInfoComponent } from './scheduling-info.component';

describe('SchedulingInfoComponent', () => {
  let component: SchedulingInfoComponent;
  let fixture: ComponentFixture<SchedulingInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchedulingInfoComponent]
    });
    fixture = TestBed.createComponent(SchedulingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
