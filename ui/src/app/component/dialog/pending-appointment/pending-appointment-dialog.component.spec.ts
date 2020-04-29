import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingAppointmentDialogComponent } from './pending-appointment-dialog.component';

describe('PendingAppointmentDialogComponent', () => {
  let component: PendingAppointmentDialogComponent;
  let fixture: ComponentFixture<PendingAppointmentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingAppointmentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingAppointmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
