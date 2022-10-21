import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SharedService } from '../../../shared/shared/shared.service';

@Injectable()
export class CommitsService {
  constructor(private readonly http: HttpClient) { }

  getCommits(repoName: string): Observable<any> {
    const params = `q=${repoName}`;
    return this.http.get(`${environment.baseUrl}/commits?${params}`);
  }
}
