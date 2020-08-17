import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlldocComponent } from './alldoc.component';

describe('AlldocComponent', () => {
  let component: AlldocComponent;
  let fixture: ComponentFixture<AlldocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlldocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlldocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
