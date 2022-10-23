import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs';
import { BaseTableComponent } from 'src/app/shared/components/base-table/base-table.component';
import { StoreService } from 'src/app/shared/services/store.service';
import { TableService } from 'src/app/shared/services/table.service';
import { Commit } from './class/commits';
import { GetCommitData, GetCommitResult } from './interface/commits';
import { CommitsService } from './services/commits.service';

@Component({
  selector: 'app-commits',
  templateUrl: './commits.component.html',
  styleUrls: ['./commits.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommitsComponent extends BaseTableComponent  implements OnInit {
  commits: Commit[] = [];
  data!: GetCommitData;
  
  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly location: Location,
              private readonly storeService: StoreService,
              private readonly commitService: CommitsService,
              private readonly spinnerService: NgxSpinnerService,
              private readonly tableService: TableService) {
    super();
  }

  ngOnInit(): void {
    this.storeService.navCommitisVisible$.next(true);
    this.activatedRoute.queryParams.pipe(first()).subscribe(params => {
      this.data = new GetCommitData(params['repoName']);
      this.getCommit();
    });
  }

  addCommits(): void {
    super.addRows(this.data, this.tableService);
    this.getCommit();
  }

  private getCommit(): void {
    this.tableService.IsVisible$.next(false);
    this.spinnerService.show();
    this.commitService.getCommits(this.data as GetCommitData).subscribe({
      next: (commitsResult: GetCommitResult) => {
        this.tableService.totalData$.next(commitsResult.totalCommits);
        this.commits = this.commits.concat(commitsResult.commits);
        this.tableService.dataLength$.next(this.commits.length);
        this.tableService.IsVisible$.next(true);
      },
      error: () => console.log('TODO ERROR'),
      complete: () => this.spinnerService.hide()
    })
  }

  goBack(): void {
    this.storeService.navCommitisVisible$.next(false);
    this.location.back();
  }
}