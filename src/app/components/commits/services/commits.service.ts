import { Injectable } from '@angular/core';
import { SharedService } from '../../../shared/shared/shared.service';

@Injectable()
export class CommitsService {
  constructor(private readonly shared: SharedService) { }

  async getCommits(repoName: string): Promise<any> {
    const q = `q=${repoName}`;
    return await this.shared.octokit.request('GET /search/commits', { q });
  }
}
