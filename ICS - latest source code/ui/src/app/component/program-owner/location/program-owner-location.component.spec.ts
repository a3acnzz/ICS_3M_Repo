import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProgramOwnerLocationComponent} from './program-owner-location.component';

describe('ProgramOwnerLocationComponent', () => {
  let component: ProgramOwnerLocationComponent;
  let fixture: ComponentFixture<ProgramOwnerLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramOwnerLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramOwnerLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
