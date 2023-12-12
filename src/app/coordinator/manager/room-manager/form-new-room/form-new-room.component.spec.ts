import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNewRoomComponent } from './form-new-room.component';

describe('FormNewRoomComponent', () => {
  let component: FormNewRoomComponent;
  let fixture: ComponentFixture<FormNewRoomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormNewRoomComponent]
    });
    fixture = TestBed.createComponent(FormNewRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
