import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisciplineInfoComponent } from './discipline-info.component';

describe('DisciplineInfoComponent', () => {
  let component: DisciplineInfoComponent;
  let fixture: ComponentFixture<DisciplineInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisciplineInfoComponent]
    });
    fixture = TestBed.createComponent(DisciplineInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
