import { Injectable } from '@angular/core';
import { Octokit } from 'octokit';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  navCommitisVisible$ = new BehaviorSubject<boolean>(false);

  octokit = new Octokit({
    auth: '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'
  });
}
