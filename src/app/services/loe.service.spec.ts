import { TestBed } from '@angular/core/testing';

import { LoeService } from './loe.service';

describe('LoeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoeService = TestBed.get(LoeService);
    expect(service).toBeTruthy();
  });
});
