import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationalCopyComponent } from './informational-copy.component';

describe('InformationalCopyComponent', () => {
  let component: InformationalCopyComponent;
  let fixture: ComponentFixture<InformationalCopyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformationalCopyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationalCopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
