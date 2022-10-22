import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Repo } from 'src/app/components/repos/class/repos';
import { RepoData } from 'src/app/components/repos/interface/repos';
import { StoreData } from './interface/shared';

export enum StoreKey {
  repos = 'repos',
  repoData = 'repoData'
}

export type StoreValue = Repo[] | RepoData; 

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private store = new Map<StoreKey, StoreValue>();
  navCommitisVisible$ = new BehaviorSubject<boolean>(false);

  setStore(storeData: StoreData[]): void {
    storeData.forEach((data: StoreData) => {
      if(this.store.has(data.key)) {
        this.store.set(data.key, data.value);
      } else {
        this.store.set(data.key, data.value); 
      }
    })
  }

  getStore<T extends StoreValue>(key: StoreKey): T {
    return this.store.get(key) as T;
  }

  cleanStore(): void {
    this.store.clear();
  }
}
