import { TestBed } from '@angular/core/testing';

import { ShowHeaderService } from './show-header.service';

describe('ShowHeaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShowHeaderService = TestBed.get(ShowHeaderService);
    expect(service).toBeTruthy();
  });
});
