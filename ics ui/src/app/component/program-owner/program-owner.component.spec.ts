import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProgramOwnerComponent} from './program-owner.component';

describe('ProgramOwnerComponent', () => {
  let component: ProgramOwnerComponent;
  let fixture: ComponentFixture<ProgramOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramOwnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
