import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { Repo } from './class/repos';
import { RepoData } from './interface/repos';
import { ReposService } from './services/repos.service';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.scss']
})
export class ReposComponent {
  optionalParams = false;
  searchForm = new FormGroup({
    repoName: new FormControl<string>(''),
    language: new FormControl<string>(''),
    minStars: new FormControl<number>(0),
    issueName: new FormControl<string>(''),
  });
  repos?: Repo[] = undefined;

  constructor(private readonly repoService: ReposService, private readonly spinnerService: NgxSpinnerService, private readonly router: Router) { }

  unsetOptionals(): void {
    this.searchForm.controls.language.setValue('');
    this.searchForm.controls.minStars.setValue(0);
  }

  getDisabledButton(): boolean {
    return !this.searchForm.controls.repoName.value;
  }
  
  getRepos(): void {
    const controls = this.searchForm.controls;
    if(!controls.repoName.value) {
      // TODO ERROR
      return;
    }

    this.spinnerService.show();
    this.repos = undefined;
    const params: RepoData = {
      reportName: controls.repoName.value || '',
      language: controls.language.value || '',
      minStars: controls.minStars.value || 0,
      issueName: controls.issueName.value || ''
    };
    this.repoService.getRepos(params).subscribe({
      next: ([repos, issuesRepoUrl]: [Repo[], string[]]) => {
        this.repos = repos.filter((repo: Repo) => !issuesRepoUrl || !issuesRepoUrl.length || issuesRepoUrl.some((issueRepoUrl: string) => issueRepoUrl === repo.url));
      },
      error: () => console.log('TODO ERROR'),
      complete: () => this.spinnerService.hide()
    });
  }

  goToCommits(repoName: string): void {
    this.spinnerService.show();
    this.router.navigate(['commits'], { queryParams: { repoName } });
  }
}
