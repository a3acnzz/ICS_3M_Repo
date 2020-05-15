import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ContactUsConfigureDialogComponent} from './contact-us-configure-dialog.component';

describe('ContactUsConfigureDialogComponent', () => {
  let component: ContactUsConfigureDialogComponent;
  let fixture: ComponentFixture<ContactUsConfigureDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactUsConfigureDialogComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactUsConfigureDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
