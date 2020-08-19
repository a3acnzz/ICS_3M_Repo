import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorpHwSwComponent } from './corp-hw-sw.component';

describe('CorpHwSwComponent', () => {
  let component: CorpHwSwComponent;
  let fixture: ComponentFixture<CorpHwSwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorpHwSwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorpHwSwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
