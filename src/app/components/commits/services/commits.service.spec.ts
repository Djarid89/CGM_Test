import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { CommitsService } from './commits.service';

describe('CommitsService', () => {
  let service: CommitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommitsService],
      imports: [HttpClientModule],
    });
    service = TestBed.inject(CommitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
