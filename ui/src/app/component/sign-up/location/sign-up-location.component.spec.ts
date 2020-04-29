import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SignUpLocationComponent} from './sign-up-location.component';

describe('SignUpLocationComponent', () => {
  let component: SignUpLocationComponent;
  let fixture: ComponentFixture<SignUpLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
