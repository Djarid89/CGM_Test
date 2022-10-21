import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class ReposService {

  constructor(private readonly http: HttpClient) { }

  getRepos(name: string, language: string, minStars: number, issuestTitle: string): Observable<any> {
    let params = `q=${name}`;
    if(language) {
      params += `+language:${language}`;
    }
    if(minStars) {
      params += `+stars:>${minStars}`;
    }
    if(issuestTitle) {
      params = `issues?${params}`;
    }
    return this.http.get(`${environment.baseUrl}repositories?${params}`);
  }
}
