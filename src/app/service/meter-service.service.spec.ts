import { TestBed } from '@angular/core/testing';

import { MeterServiceService } from './meter-service.service';

describe('MeterServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MeterServiceService = TestBed.get(MeterServiceService);
    expect(service).toBeTruthy();
  });
});
