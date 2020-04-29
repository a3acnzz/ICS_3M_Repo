import {inject, TestBed} from '@angular/core/testing';

import {ContactUsService} from './contactUs.service';

describe('ContactUsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContactUsService]
    });
  });

  it('should ...', inject([ContactUsService], (service: ContactUsService) => {
    expect(service).toBeTruthy();
  }));
});
