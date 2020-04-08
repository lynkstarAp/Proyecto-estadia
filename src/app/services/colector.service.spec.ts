import { TestBed } from '@angular/core/testing';

import { ColectorService } from './colector.service';

describe('ColectorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ColectorService = TestBed.get(ColectorService);
    expect(service).toBeTruthy();
  });
});
