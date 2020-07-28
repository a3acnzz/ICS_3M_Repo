import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AppointmentCancellationDialogComponent} from './appointment-cancellation-dialog.component';

describe('AppointmentCancellationDialogComponent', () => {
  let component: AppointmentCancellationDialogComponent;
  let fixture: ComponentFixture<AppointmentCancellationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentCancellationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentCancellationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
