import { Injectable } from '@angular/core';
import { Octokit } from 'octokit';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  navCommitisVisible$ = new BehaviorSubject<boolean>(false);
}
