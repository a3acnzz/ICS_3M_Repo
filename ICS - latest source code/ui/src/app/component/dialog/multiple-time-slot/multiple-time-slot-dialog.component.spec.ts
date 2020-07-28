import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MultipleTimeSlotDialogComponent} from './multiple-time-slot-dialog.component';

describe('MultipleTimeSlotDialogComponent', () => {
  let component: MultipleTimeSlotDialogComponent;
  let fixture: ComponentFixture<MultipleTimeSlotDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultipleTimeSlotDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleTimeSlotDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
