import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Repo } from 'src/app/components/repos/class/repos';
import { RepoData } from 'src/app/components/repos/interface/repos';
import { StoreData } from '../interface/shared';

export enum StoreKey {
  repos = 'repos',
  repoData = 'repoData'
}

export type StoreValue = Repo[] | RepoData; 

@Injectable({
  providedIn: 'root'
})
/**
  * Class for Store data in app.
*/
export class StoreService {
  private store = new Map<StoreKey, StoreValue>();
  private cleanable = true;
  navCommitisVisible$ = new BehaviorSubject<boolean>(false);

  setStore(storeData: StoreData[]): void {
    storeData.forEach((data: StoreData) => this.store.set(data.key, data.value));
  }

  getStoreItem<T extends StoreValue>(key: StoreKey): T {
    return this.store.get(key) as T;
  }

  setCleanable(value: boolean): void {
    this.cleanable = value;
  }

  getCleanable(): boolean {
    return this.cleanable;
  }

  cleanStore(): void {
    this.store.clear();
  }
}
