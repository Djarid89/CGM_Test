import { Injectable } from '@angular/core';
import { Octokit } from 'octokit';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  octokit = new Octokit({ auth: environment.token });
  navCommitisVisible$ = new BehaviorSubject<boolean>(false);
}
