/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NotAuthorizedComponent} from './not-authorized.component';
import {ActivatedRoute} from '@angular/router';
import {ActivatedRouteStub} from '../../../testing/router-stub.spec';

describe('NotAuthorizedComponent', () => {
  let component: NotAuthorizedComponent;
  let fixture: ComponentFixture<NotAuthorizedComponent>;
  const activatedRoute: ActivatedRouteStub = new ActivatedRouteStub();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotAuthorizedComponent],
      providers: [
        {provide: ActivatedRoute, useValue: activatedRoute},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    activatedRoute.testParams = {ewrNbr: '1232-23232'};
    fixture = TestBed.createComponent(NotAuthorizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
