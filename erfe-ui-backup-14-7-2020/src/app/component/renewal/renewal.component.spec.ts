import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RenewalComponent } from './renewal.component';
describe('RenewalComponent', () => {
  let component: RenewalComponent;
  let fixture: ComponentFixture<RenewalComponent>;
  /**Inject function to fetch dependencies
   * 
    */
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenewalComponent ]
    })
    .compileComponents();
  }));
  /**Inject function to fetch dependencies
   * 
    */
  beforeEach(() => {
    fixture = TestBed.createComponent(RenewalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
