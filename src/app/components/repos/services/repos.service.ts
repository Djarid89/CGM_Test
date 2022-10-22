import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, forkJoin, from, map, Observable, of, switchMap, timer } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Repo } from '../class/repos';
import { RepoData } from '../interface/repos';

@Injectable()
export class ReposService {

  constructor(private readonly http: HttpClient) { }

  getRepos(repoData: RepoData): Observable<[Repo[], string[]]> {
    return forkJoin([this._getRepos(repoData), this._getIssues(repoData.issueName)]);
  }

  private _getRepos(repoData: RepoData): Observable<Repo[]> {
    let params = `q=name:${repoData.reportName}`;
    if(repoData.language) {
      params += `+language:${repoData.language}`;
    }
    if(repoData.minStars) {
      params += `+stars:>${repoData.minStars}`;
    }
    return this.http.get(`${environment.baseUrl}repositories?${params}`).pipe<Repo[]>(
      map<any, Repo[]>((result: any) => result.items?.map((item: any) => new Repo(item.name, item.owner.avatar_url, new Date(item.created_at), item.url)) || [])
    )
  }

  private _getIssues(issueName: string): Observable<string[]> {
    if(!issueName) {
      return of([]).pipe(delay(1));
    }
    const params = `q=title:${issueName}`;
    return this.http.get(`${environment.baseUrl}issues?${params}`).pipe(
      map((result: any) => result.items.map((item: any) => item.repository_url))
    );
  }
}
