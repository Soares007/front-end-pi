import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNewTeamComponent } from './form-new-team.component';

describe('FormNewTeamComponent', () => {
  let component: FormNewTeamComponent;
  let fixture: ComponentFixture<FormNewTeamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormNewTeamComponent]
    });
    fixture = TestBed.createComponent(FormNewTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
