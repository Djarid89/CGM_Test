import { TestBed } from '@angular/core/testing';
import { StoreData } from '../interface/shared';

import { StoreKey, StoreService } from './store.service';

describe('StoreService', () => {
  let service: StoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('repos should be empty', () => {
    const emptyRepos: StoreData = { key: StoreKey.repos, value: [] };
    service.setStore([emptyRepos]);
    const repos = service.getStoreItem(StoreKey.repos);
    expect(repos).toEqual([]);
  });

  it('store should be empty', () => {
    const emptyRepos: StoreData = { key: StoreKey.repos, value: [] };
    service.setStore([emptyRepos]);
    service.cleanStore();
    expect(service.getStoreItem(StoreKey.repos)).toBeUndefined();
  });

  it('store should be uncleanable', () => {
    service.setUncleanable();
    expect(service.getCleanable()).toBeFalse();
  });
});
