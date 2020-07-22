import {inject, TestBed} from '@angular/core/testing';

import {ProgramService} from './program.service';

describe('ProgramServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProgramService]
    });
  });

  it('should ...', inject([ProgramService], (service: ProgramService) => {
    expect(service).toBeTruthy();
  }));
});
