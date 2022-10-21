import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs';
import { SharedService } from '../../shared/shared/shared.service';
import { Commit } from './class/commits';
import { CommitsService } from './services/commits.service';

@Component({
  selector: 'app-commits',
  templateUrl: './commits.component.html',
  styleUrls: ['./commits.component.scss']
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
      const result = this.commitService.getCommits(params['repoName'])
      result.then(commits => this.commits = commits?.data?.items?.map((item: any) => new Commit(item.commit.author.name, item.commit.url, item.commit.message)) || []);
      result.catch(() => console.log('TODO ERROR'));
      result.finally(() => this.spinnerService.hide());
    });
  }

  goBack(): void {
    this.sharedService.navCommitisVisible$.next(false);
    this.location.back();
  }
}