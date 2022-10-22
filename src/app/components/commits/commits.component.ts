import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs';
import { SharedService } from '../../shared/shared/shared.service';
import { Commit } from './class/commits';
import { CommitsService } from './services/commits.service';

@Component({
  selector: 'app-commits',
  templateUrl: './commits.component.html',
  styleUrls: ['./commits.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommitsComponent implements OnInit {
  commits?: Commit[];
  
  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly location: Location,
              private readonly sharedService: SharedService,
              private readonly commitService: CommitsService,
              private readonly spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.sharedService.navCommitisVisible$.next(true);
    this.activatedRoute.queryParams.pipe(first()).subscribe(params => {
      this.commitService.getCommits(params['repoName']).subscribe({
        next: (commits: any) => {
          this.commits = commits?.items?.map((item: any) => new Commit(item.commit.author.name, item.commit.url, item.commit.message)) || []
        },
        error: () => console.log('TODO ERROR'),
        complete: () => this.spinnerService.hide()
      })
    });
  }

  goBack(): void {
    this.sharedService.navCommitisVisible$.next(false);
    this.location.back();
  }
}