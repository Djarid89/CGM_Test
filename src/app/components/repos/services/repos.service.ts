import { Injectable } from '@angular/core';
import { SharedService } from '../../../shared/shared/shared.service';

@Injectable()
export class ReposService {

  constructor(private readonly shared: SharedService) { }

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
    return await this.shared.octokit.request('GET /search/repositories', { q: params, });
  }
}
