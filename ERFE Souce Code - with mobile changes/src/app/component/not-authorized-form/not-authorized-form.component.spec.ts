import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotAuthorizedFormComponent } from './not-authorized-form.component';

describe('NotAuthorizedFormComponent', () => {
  let component: NotAuthorizedFormComponent;
  let fixture: ComponentFixture<NotAuthorizedFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotAuthorizedFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotAuthorizedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
