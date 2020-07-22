import {inject, TestBed} from '@angular/core/testing';
import {BccEmailService} from './bcc-email.service';

describe('EmailCopyAddressService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BccEmailService]
    });
  });

  it('should ...', inject([BccEmailService], (service: BccEmailService) => {
    expect(service).toBeTruthy();
  }));
});
