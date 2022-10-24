import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, forkJoin, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Repo } from '../class/repos';
import { GetReposData, GetRepoResult } from '../interface/repos';

@Injectable()
export class ReposService {

  constructor(private readonly http: HttpClient) { }

  /*
    * In my idea when get repos I want to filter them by issues that that way:
    * - when the longer call return I map an array with the property 'repository_url' from the issues that comes from this.getIssues(repoData.issueName)
    * - filter the repo returned from the call this._getRepos(repoData) matching 'repository_url' from issues and 'url' property of repo.
    * I can't implement this solution because I must have all the issues in order doing this but issues comes from server at most with 100 pages at time.
    * So for a single interrogation I can have tens of thousands of result so a very high number of call can be necessary but doing in this way I can quickly reach the rete limit of github
    * For this motivation i disabled the issueName property in attendance of a better solution
  */
  getRepos(repoData: GetReposData): Observable<[GetRepoResult, string[]]> {
    return forkJoin([this._getRepos(repoData), this.getIssues(repoData.issueName)]);
  }

  private _getRepos(repoData: GetReposData): Observable<GetRepoResult> {
    let params = `q=name:${repoData.reportName}`;
    if(repoData.language) {
      params += `+language:${repoData.language}`;
    }
    if(repoData.minStars) {
      params += `+stars:>${repoData.minStars}`;
    }
    params += `&per_page=15&page=${repoData.page}`;
    return this.http.get(`${environment.baseUrl}repositories?${params}`).pipe<GetRepoResult>(
      map<any, GetRepoResult>((result: any) => {
        return {
          repos: result.items?.map((item: any) => new Repo(item.name, item.owner.avatar_url, new Date(item.created_at), item.url)) || [],
          totalRepos: result.total_count
        }
      })
    )
  }

  private getIssues(issueName: string): Observable<string[]> {
    if(!issueName) {
      return of([]).pipe(delay(0));
    }
    const params = `q=title:${issueName}&state:open&state:close`;
    return this.http.get(`${environment.baseUrl}issues?${params}`).pipe(
      map((result: any) => result.items.map((item: any) => item.repository_url))
    );
  }
}
