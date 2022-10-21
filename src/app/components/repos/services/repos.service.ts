import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class ReposService {

  constructor() { }

  async getRepos(name: string, language: string, minStars: number, issuestTitle: string): Promise<any> {
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
    return await environment.octokit.request('GET /search/repositories', { q: params, });
  }
}
