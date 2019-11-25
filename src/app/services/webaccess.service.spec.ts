import { TestBed } from '@angular/core/testing';

import { WebaccessService } from './webaccess.service';

describe('WebaccessService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WebaccessService = TestBed.get(WebaccessService);
    expect(service).toBeTruthy();
  });
});
