import { TestBed } from '@angular/core/testing';

import { ScrumMasterService } from './scrum-master.service';

describe('ScrumMasterService', () => {
  let service: ScrumMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrumMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
