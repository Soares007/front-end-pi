import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryRequestComponent } from './history-request.component';

describe('HistoryRequestComponent', () => {
  let component: HistoryRequestComponent;
  let fixture: ComponentFixture<HistoryRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoryRequestComponent]
    });
    fixture = TestBed.createComponent(HistoryRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
