import { TestBed } from '@angular/core/testing';

import { ViaCepServiceService } from './via-cep-service.service';

describe('ViaCepServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViaCepServiceService = TestBed.get(ViaCepServiceService);
    expect(service).toBeTruthy();
  });
});
