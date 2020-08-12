import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DownMaintenanceComponent} from './down-maintenance.component';

describe('DownMaintenanceComponent', () => {
  let component: DownMaintenanceComponent;
  let fixture: ComponentFixture<DownMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownMaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
