import { TestBed } from '@angular/core/testing';

import { HomeguardService } from './homeguard.service';

describe('HomeguardService', () => {
  let service: HomeguardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeguardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
