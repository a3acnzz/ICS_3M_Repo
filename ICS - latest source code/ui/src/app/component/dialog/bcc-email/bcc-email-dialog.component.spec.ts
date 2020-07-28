import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BccEmailDialogComponent} from './bcc-email-dialog.component';

describe('EmailCopyAddressDialogComponent', () => {
  let component: BccEmailDialogComponent;
  let fixture: ComponentFixture<BccEmailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BccEmailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BccEmailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
