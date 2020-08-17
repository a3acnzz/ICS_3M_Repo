import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorpHwSwJobTriggerComponent } from './corp-hw-sw-job-trigger.component';

describe('CorpHwSwJobTriggerComponent', () => {
  let component: CorpHwSwJobTriggerComponent;
  let fixture: ComponentFixture<CorpHwSwJobTriggerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorpHwSwJobTriggerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorpHwSwJobTriggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
