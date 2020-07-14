import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobTriggerComponent } from './job-trigger.component';

describe('JobTriggerComponent', () => {
  let component: JobTriggerComponent;
  let fixture: ComponentFixture<JobTriggerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobTriggerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobTriggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
