import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ReposService } from './repos.service';

describe('ReposService', () => {
  let service: ReposService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReposService],
      imports: [HttpClientModule],
    });
    service = TestBed.inject(ReposService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
