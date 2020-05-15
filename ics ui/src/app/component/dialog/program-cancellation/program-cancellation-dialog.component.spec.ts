import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProgramCancellationDialogComponent} from './program-cancellation-dialog.component';

describe('ProgramCancellationDialogComponent', () => {
  let component: ProgramCancellationDialogComponent;
  let fixture: ComponentFixture<ProgramCancellationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramCancellationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramCancellationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
