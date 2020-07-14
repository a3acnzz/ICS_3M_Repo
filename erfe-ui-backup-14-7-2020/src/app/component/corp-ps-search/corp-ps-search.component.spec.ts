import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorpPsSearchComponent } from './corp-ps-search.component';

describe('CorpPsSearchComponent', () => {
  let component: CorpPsSearchComponent;
  let fixture: ComponentFixture<CorpPsSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorpPsSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorpPsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
