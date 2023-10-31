import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeAccessComponent } from './type-access.component';

describe('TypeAccessComponent', () => {
  let component: TypeAccessComponent;
  let fixture: ComponentFixture<TypeAccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypeAccessComponent]
    });
    fixture = TestBed.createComponent(TypeAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
