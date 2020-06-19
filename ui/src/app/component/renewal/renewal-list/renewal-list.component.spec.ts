import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RenewalListComponent } from './renewal-list.component';
describe('RenewalListComponent', () => {
  let component: RenewalListComponent;
  let fixture: ComponentFixture<RenewalListComponent>;
  /**Inject function to fetch dependencies
   * 
    */
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenewalListComponent ]
    })
    .compileComponents();
  }));
  /**Inject function to fetch dependencies
   * 
    */
  beforeEach(() => {
    fixture = TestBed.createComponent(RenewalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
