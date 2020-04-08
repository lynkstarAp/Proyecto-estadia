import { TestBed } from '@angular/core/testing';

import { MedidorServiceService } from './medidor-service.service';

describe('MedidorServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MedidorServiceService = TestBed.get(MedidorServiceService);
    expect(service).toBeTruthy();
  });
});
