import { StoreKey, StoreValue } from "../services/store.service";

export interface StoreData {
  key: StoreKey;
  value: StoreValue;
}

export abstract class GetData {
  page: number;

  constructor(repoPage?: number) {
    this.page = repoPage || 1;
  }
}