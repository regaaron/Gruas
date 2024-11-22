import { TestBed } from '@angular/core/testing';

import { ConductoService } from './conducto.service';

describe('ConductoService', () => {
  let service: ConductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
