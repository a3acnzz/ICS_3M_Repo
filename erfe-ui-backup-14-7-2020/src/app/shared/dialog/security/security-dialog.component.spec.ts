import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SecurityDialogComponent} from './security-dialog.component';
import {MatDialogModule, MatDialogRef} from '@angular/material';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {of} from 'rxjs/index';


class MdDialogRefStub {
  close = function (data) {
    return of(data);
  };
}

describe('SecurityDialogComponent', () => {
  let component: SecurityDialogComponent;
  let fixture: ComponentFixture<SecurityDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [SecurityDialogComponent],
      providers: [
        {provide: MatDialogRef, useClass: MdDialogRefStub},
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(SecurityDialogComponent);
        component = fixture.componentInstance;
      });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
