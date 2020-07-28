import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ChangeMaxAppointmentsDialogComponent} from './change-max-appointments-dialog.component';

describe('ChangeMaxAppointmentsDialogComponent', () => {
  let component: ChangeMaxAppointmentsDialogComponent;
  let fixture: ComponentFixture<ChangeMaxAppointmentsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeMaxAppointmentsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeMaxAppointmentsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
