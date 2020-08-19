import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCorpHwSwErfeComponent } from './new-corp-hw-sw-erfe.component';

describe('NewCorpHwSwErfeComponent', () => {
  let component: NewCorpHwSwErfeComponent;
  let fixture: ComponentFixture<NewCorpHwSwErfeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCorpHwSwErfeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCorpHwSwErfeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
