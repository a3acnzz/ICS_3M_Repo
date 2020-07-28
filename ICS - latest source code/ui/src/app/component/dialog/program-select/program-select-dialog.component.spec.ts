import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProgramSelectDialogComponent} from './program-select-dialog.component';

describe('ProgramSelectDialogComponent', () => {
  let component: ProgramSelectDialogComponent;
  let fixture: ComponentFixture<ProgramSelectDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramSelectDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramSelectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
