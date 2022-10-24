import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, Subscription } from 'rxjs';
import { BaseTableComponent } from 'src/app/shared/components/base-table/base-table.component';
import { StoreService, StoreKey } from 'src/app/shared/services/store.service';
import { TableService } from 'src/app/shared/services/table.service';
import Swal from 'sweetalert2';
import { Repo } from './class/repos';
import { GetReposData, RepoData, GetRepoResult } from './interface/repos';
import { ReposService } from './services/repos.service';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReposComponent extends BaseTableComponent implements OnInit, OnDestroy {
  repos: Repo[] = [];
  form = new FormGroup({ repoName: new FormControl<string>(''), language: new FormControl<string>(''), minStars: new FormControl<number>(0), issueName: new FormControl<string>('') });
  optionalParams = false;
  data!: GetReposData;
  goToCommitsSubs: Subscription;

  constructor(private readonly repoService: ReposService,
              private readonly spinnerService: NgxSpinnerService,
              private readonly router: Router,
              private readonly storeService: StoreService,
              private readonly tableService: TableService) {
    super();
    this.goToCommitsSubs = this.tableService.goToCommits$.subscribe({ next: (repoName: string) => this.goToCommits(repoName) });
  }

  ngOnInit(): void {
    this.repos = this.storeService.getStoreItem<Repo[]>(StoreKey.repos) || [];
    const repoData = this.storeService.getStoreItem<RepoData>(StoreKey.repoData);
    this.tableService.dataLength$.next(this.repos.length);
    this.tableService.IsVisible$.next(this.repos.length > 0);
    if(!repoData) {
      return;
    }
    this.optionalParams = repoData.optionalData;
    this.tableService.totalData$.next(repoData.totalReports);
    const controls = this.form.controls;
    controls.repoName.setValue(repoData.reportName);
    controls.language.setValue(repoData.language);
    controls.minStars.setValue(repoData.minStars);
    controls.issueName.setValue(repoData.issueName);
    this.data = new GetReposData(controls.repoName.value || '', controls.language.value || '', controls.minStars.value || 0, controls.issueName.value || '', repoData.page);
    this.storeService.setCleanable(true);
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
    this.data = new GetReposData(controls.repoName.value || '', controls.language.value || '', controls.minStars.value || 0, controls.issueName.value || '');
    this._getRepos();
  }

  private _getRepos(): void {
    this.spinnerService.show();
    this.repoService.getRepos(this.data).pipe(finalize(() => this.spinnerService.hide())).subscribe({
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
      error: () => Swal.fire({ position: 'center', icon: 'error', title: `Get repos error`, timer: 2000 })
    });
  }

  goToCommits(repoName: string): void {
    this.spinnerService.show();
    this.storeService.setCleanable(false);
    this.router.navigate(['commits'], { queryParams: { repoName } });
  }

  ngOnDestroy(): void {
    if(this.storeService.getCleanable()) {
      this.storeService.cleanStore();
    }
    this.tableService.IsVisible$.next(false);
    this.goToCommitsSubs?.unsubscribe();
  }
}
