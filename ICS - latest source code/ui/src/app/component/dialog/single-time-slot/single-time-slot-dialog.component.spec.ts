import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SingleTimeSlotDialogComponent} from './single-time-slot-dialog.component';

describe('SingleTimeSlotDialogComponent', () => {
  let component: SingleTimeSlotDialogComponent;
  let fixture: ComponentFixture<SingleTimeSlotDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleTimeSlotDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleTimeSlotDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
