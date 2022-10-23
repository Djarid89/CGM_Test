import { TestBed } from '@angular/core/testing';

import { ManualInjectorService } from './manual-injector.service';

describe('ManualInjectorService', () => {
  let service: ManualInjectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManualInjectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
