import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ContactUsViewDialogComponent} from './contact-us-view-dialog.component';

describe('ContactUsViewDialogComponent', () => {
  let component: ContactUsViewDialogComponent;
  let fixture: ComponentFixture<ContactUsViewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactUsViewDialogComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactUsViewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
