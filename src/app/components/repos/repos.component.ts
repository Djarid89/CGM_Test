import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedService, StoreKey } from 'src/app/shared/shared/shared.service';
import { Repo } from './class/repos';
import { RepoData } from './interface/repos';
import { ReposService } from './services/repos.service';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.scss']
})
export class ReposComponent implements OnInit, OnDestroy {
  optionalParams = false;
  searchForm = new FormGroup({
    repoName: new FormControl<string>(''),
    language: new FormControl<string>(''),
    minStars: new FormControl<number>(0),
    issueName: new FormControl<string>(''),
  });
  repos?: Repo[] = undefined;
  private preserveStore = false;

  constructor(private readonly repoService: ReposService,
              private readonly spinnerService: NgxSpinnerService,
              private readonly router: Router,
              private readonly sharedService: SharedService) { }

  ngOnInit(): void {
    const repos = this.sharedService.getStore<Repo[]>(StoreKey.repos);
    if(repos?.length) {
      this.repos = repos;
    }
    const repoData = this.sharedService.getStore<RepoData>(StoreKey.repoData);
    if(repoData) {
      this.optionalParams = !!repoData.optionalData;
      this.searchForm.controls.repoName.setValue(repoData.reportName);
      this.searchForm.controls.language.setValue(repoData.language);
      this.searchForm.controls.minStars.setValue(repoData.minStars);
      this.searchForm.controls.issueName.setValue(repoData.issueName); 
    }
  }

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
        this.repos = repos.filter((repo: Repo) => !params.issueName || issuesRepoUrl?.some((issueRepoUrl: string) => issueRepoUrl === repo.url) || false);
        this.sharedService.setStore([{ key: StoreKey.repos, value: this.repos },{ key: StoreKey.repoData, value: { ...params, ...{ optionalData: this.optionalParams } } }]);
      },
      error: () => console.log('TODO ERROR'),
      complete: () => this.spinnerService.hide()
    });
  }

  goToCommits(repoName: string): void {
    this.spinnerService.show();
    this.preserveStore = true;
    this.router.navigate(['commits'], { queryParams: { repoName } });
  }

  ngOnDestroy(): void {
    if(!this.preserveStore) {
      this.sharedService.cleanStore();
    }
  }
}
