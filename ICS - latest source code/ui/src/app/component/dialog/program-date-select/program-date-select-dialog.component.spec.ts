import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProgramDateSelectDialogComponent} from './program-date-select-dialog.component';

describe('ProgramDateSelectDialogComponent', () => {
  let component: ProgramDateSelectDialogComponent;
  let fixture: ComponentFixture<ProgramDateSelectDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramDateSelectDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramDateSelectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
