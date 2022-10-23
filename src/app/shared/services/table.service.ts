import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class TableService {
  IsVisible$ = new BehaviorSubject<boolean>(false);
  dataLength$ = new BehaviorSubject<number>(0);
  totalData$ = new BehaviorSubject<number>(0);
  goToCommits$ = new Subject<string>();
}
