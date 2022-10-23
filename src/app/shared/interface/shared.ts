import { StoreKey, StoreValue } from "../services/store.service";

export interface StoreData {
  key: StoreKey;
  value: StoreValue;
}

export abstract class GetData {
  page: number;

  constructor() {
    this.page = 1;
  }
}