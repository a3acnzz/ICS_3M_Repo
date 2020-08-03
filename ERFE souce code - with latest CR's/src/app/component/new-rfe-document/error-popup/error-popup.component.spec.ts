import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorPopupComponent } from './error-popup.component';

describe('ErrorPopupComponent', () => {
  let component: ErrorPopupComponent;
  let fixture: ComponentFixture<ErrorPopupComponent>;
/**Inject function to fetch dependencies
   * 
    */
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorPopupComponent ]
    })
    .compileComponents();
  }));
/**Inject function to fetch dependencies
   * 
    */
  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
