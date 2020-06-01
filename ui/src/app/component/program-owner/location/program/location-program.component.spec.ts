import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LocationProgramComponent} from './location-program.component';

describe('LocationProgramComponent', () => {
  let component: LocationProgramComponent;
  let fixture: ComponentFixture<LocationProgramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationProgramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
