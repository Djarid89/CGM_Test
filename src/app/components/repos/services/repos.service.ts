import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, forkJoin, from, map, Observable, of, switchMap, timer } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Repo } from '../class/repos';
import { GetReposData, RepoData, RepoResult } from '../interface/repos';

@Injectable()
export class ReposService {

  constructor(private readonly http: HttpClient) { }

  getRepos(repoData: GetReposData): Observable<[RepoResult, string[]]> {
    return forkJoin([this._getRepos(repoData), this._getIssues(repoData.issueName)]);
  }

  private _getRepos(repoData: GetReposData): Observable<RepoResult> {
    let params = `q=name:${repoData.reportName}&per_page=15&page=${repoData.page}`;
    if(repoData.language) {
      params += `+language:${repoData.language}`;
    }
    if(repoData.minStars) {
      params += `+stars:>${repoData.minStars}`;
    }
    return this.http.get(`${environment.baseUrl}repositories?${params}`).pipe<RepoResult>(
      map<any, RepoResult>((result: any) => {
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
