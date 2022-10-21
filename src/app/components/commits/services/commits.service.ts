import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SharedService } from '../../../shared/shared/shared.service';

@Injectable()
export class CommitsService {
  constructor() { }

  async getCommits(repoName: string): Promise<any> {
    const q = `q=${repoName}`;
    return await environment.octokit.request('GET /search/commits', { q });
  }
}
