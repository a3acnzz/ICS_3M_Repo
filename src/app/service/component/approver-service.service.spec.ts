import { TestBed } from '@angular/core/testing';

import { ApproverServiceService } from './approver-service.service';

describe('ApproverServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApproverServiceService = TestBed.get(ApproverServiceService);
    expect(service).toBeTruthy();
  });
});
