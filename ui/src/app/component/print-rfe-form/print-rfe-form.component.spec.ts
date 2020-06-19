import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintRfeFormComponent } from './print-rfe-form.component';

describe('PrintRfeFormComponent', () => {
  let component: PrintRfeFormComponent;
  let fixture: ComponentFixture<PrintRfeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintRfeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintRfeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
