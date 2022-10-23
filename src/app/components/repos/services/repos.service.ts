import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, EMPTY, forkJoin, from, map, Observable, of, switchMap, takeWhile, timer } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Repo } from '../class/repos';
import { GetReposData, GetRepoResult } from '../interface/repos';

@Injectable()
export class ReposService {

  constructor(private readonly http: HttpClient) { }

  getRepos(repoData: GetReposData): Observable<[GetRepoResult, string[]]> {
    return forkJoin([this._getRepos(repoData), this._getIssues(repoData.issueName)]);
  }

  private _getRepos(repoData: GetReposData): Observable<GetRepoResult> {
    let params = `q=name:${repoData.reportName}&per_page=15&page=${repoData.page}`;
    if(repoData.language) {
      params += `+language:${repoData.language}`;
    }
    if(repoData.minStars) {
      params += `+stars:>${repoData.minStars}`;
    }
    return this.http.get(`${environment.baseUrl}repositories?${params}`).pipe<GetRepoResult>(
      map<any, GetRepoResult>((result: any) => {
        return {
          repos: result.items?.map((item: any) => new Repo(item.name, item.owner.avatar_url, new Date(item.created_at), item.url)) || [],
          totalRepos: result.total_count
        }
      })
    )
  }

  private _getIssues(issueName: string): Observable<string[]> {
    if(!issueName) {
      return of([]).pipe(delay(0));
    }
    const params = `q=title:${issueName}&state:open&state:close`;
    return this.http.get(`${environment.baseUrl}issues?${params}`).pipe(
      map((result: any) => result.items.map((item: any) => item.repository_url))
    );
  }
}
