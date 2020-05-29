import { TestBed } from '@angular/core/testing';

import { ActivityLogServiceService } from './activity-log-service.service';

describe('ActivityLogServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActivityLogServiceService = TestBed.get(ActivityLogServiceService);
    expect(service).toBeTruthy();
  });
});
