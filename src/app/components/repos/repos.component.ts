import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseTableComponent } from 'src/app/shared/components/base-table/base-table.component';
import { StoreService, StoreKey } from 'src/app/shared/services/store.service';
import { TableService } from 'src/app/shared/services/table.service';
import { Repo } from './class/repos';
import { GetReposData, RepoData, GetRepoResult } from './interface/repos';
import { ReposService } from './services/repos.service';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.scss']
})
export class ReposComponent extends BaseTableComponent implements OnInit, OnDestroy {
  repos: Repo[] = [];
  form = new FormGroup({ repoName: new FormControl<string>(''), language: new FormControl<string>(''), minStars: new FormControl<number>(0), issueName: new FormControl<string>('') });
  optionalParams = false;
  data = new GetReposData();

  constructor(private readonly repoService: ReposService,
              private readonly spinnerService: NgxSpinnerService,
              private readonly router: Router,
              private readonly storeService: StoreService,
              private readonly tableService: TableService) {
    super();
    this.tableService.goToCommits$.subscribe({ next: (repoName: string) => this.goToCommits(repoName) });
  }

  ngOnInit(): void {
    this.repos = this.storeService.getStore<Repo[]>(StoreKey.repos) || [];
    const repoData = this.storeService.getStore<RepoData>(StoreKey.repoData);
    this.tableService.dataLength$.next(this.repos.length);
    if(!repoData) {
      return;
    }
    this.optionalParams = repoData.optionalData;
    this.tableService.totalData$.next(repoData.totalReports);
    this.form.controls.repoName.setValue(repoData.reportName);
    this.form.controls.language.setValue(repoData.language);
    this.form.controls.minStars.setValue(repoData.minStars);
    this.form.controls.issueName.setValue(repoData.issueName);
  }

  unsetOptionals(): void {
    this.form.controls.language.setValue('');
    this.form.controls.minStars.setValue(0);
  }

  getDisabledButton(): boolean {
    return !this.form.controls.repoName.value;
  }
  
  addRepos(): void {
    super.addRows(this.data, this.tableService);
    this._getRepos();
  }

  getRepos(): void {
    this.repos = [];
    this.tableService.IsVisible$.next(false);
    const controls = this.form.controls;
    this.data.setData(controls.repoName.value || '', controls.language.value || '', controls.minStars.value || 0, controls.issueName.value || '');
    this._getRepos();
  }

  private _getRepos(): void {
    
    this.spinnerService.show();
    this.repoService.getRepos(this.data).subscribe({
      next: ([reposResult, issuesRepoUrl]: [GetRepoResult, string[]]) => {
        this.tableService.totalData$.next(reposResult.totalRepos);
        this.tableService.IsVisible$.next(true);
        if(this.form.controls.issueName.value) {
          const newRepos = reposResult?.repos?.filter((repo: Repo) => !issuesRepoUrl.some((issueRepoUrl: string) => issueRepoUrl === repo.url)) || [];
          this.repos = this.repos.concat(newRepos);
        } else {
          this.repos = this.repos.concat(reposResult.repos);
        }
        this.tableService.dataLength$.next(this.repos.length);
        const value: RepoData = { ...this.data, ...{ optionalData: this.optionalParams }, ...{ totalReports: this.tableService.totalData$.value }, ...{ page: this.data.page } };
        this.storeService.setStore([{ key: StoreKey.repos, value: this.repos },{ key: StoreKey.repoData, value }]);
      },
      error: () => console.log('TODO ERROR'),
      complete: () => this.spinnerService.hide()
    });
  }

  goToCommits(repoName: string): void {
    this.spinnerService.show();
    this.storeService.setUncleanable();
    this.router.navigate(['commits'], { queryParams: { repoName } });
  }

  ngOnDestroy(): void {
    if(this.storeService.getCleanable()) {
      this.storeService.cleanStore();
    }
  }
}
