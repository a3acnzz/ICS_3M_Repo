import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProgramAppointmentsComponent} from './program-appointments.component';

describe('ProgramAppointmentsComponent', () => {
  let component: ProgramAppointmentsComponent;
  let fixture: ComponentFixture<ProgramAppointmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramAppointmentsComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
