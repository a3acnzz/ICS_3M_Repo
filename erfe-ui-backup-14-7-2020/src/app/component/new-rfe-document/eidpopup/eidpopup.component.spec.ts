import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EIDpopupComponent } from './eidpopup.component';

describe('EIDpopupComponent', () => {
  let component: EIDpopupComponent;
  let fixture: ComponentFixture<EIDpopupComponent>;
/**Inject function to fetch dependencies
   * 
    */
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EIDpopupComponent ]
    })
    .compileComponents();
  }));
/**Inject function to fetch dependencies
   * 
    */
  beforeEach(() => {
    fixture = TestBed.createComponent(EIDpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
