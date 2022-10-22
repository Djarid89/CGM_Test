import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, from, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Repo } from '../class/repos';
import { RepoData } from '../interface/repos';

@Injectable()
export class ReposService {

  constructor(private readonly http: HttpClient) { }

  getRepos(repoData: RepoData): Observable<[Repo[], string[]]> {
    return forkJoin([this._getRepos(repoData), this._getIssues(repoData)]);
  }

  private _getRepos(repoData: RepoData): Observable<Repo[]> {
    const params = this.getParams(repoData.reportName, repoData.language, repoData.minStars);
    return this.http.get(`${environment.baseUrl}repositories?${params}`).pipe<Repo[]>(
      map<any, Repo[]>((result: any) => result.items?.map((item: any) => new Repo(item.name, item.owner.avatar_url, new Date(item.created_at), item.url)) || [])
    )
  }

  private _getIssues(repoData: RepoData): Observable<string[]> {
    const params = this.getParams(repoData.reportName, repoData.language, repoData.minStars);
    return this.http.get(`${environment.baseUrl}issues?${params}`).pipe(
      map((result: any) => result.repository_url)
    );
  }

  private getParams(name: string, language: string, minStars: number): string {
    let params = `q=${name}`;
    if(language) {
      params += `+language:${language}`;
    }
    if(minStars) {
      params += `+stars:>${minStars}`;
    }
    return params;
  }
}
