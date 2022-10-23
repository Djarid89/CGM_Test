import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Commit } from '../class/commits';
import { GetCommitData, GetCommitResult } from '../interface/commits';

@Injectable()
export class CommitsService {
  constructor(private readonly http: HttpClient) { }

  getCommits(commitData: GetCommitData): Observable<GetCommitResult> {
    const params = `q=${commitData.repoName}&per_page=15&page=${commitData.page}`;
    return this.http.get(`${environment.baseUrl}commits?${params}`).pipe(
      map<any, GetCommitResult>((result: any) => {
        return {
          commits: result?.items?.map((item: any) => new Commit(item.commit.author.name, item.commit.url, item.commit.message)) || [],
          totalCommits: result.total_count
        }
      })
    );
  }
}
