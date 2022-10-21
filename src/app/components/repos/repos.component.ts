import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Repo } from './class/repos';
import { ReposService } from './services/repos.service';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.scss']
})
export class ReposComponent {
  optionalParams = false;
  searchForm = new FormGroup({
    name: new FormControl<string>(''),
    language: new FormControl<string>(''),
    minStars: new FormControl<number>(0),
    issuetitle: new FormControl<string>(''),
  });
  repos?: Repo[] = undefined;

  constructor(private readonly repoService: ReposService, private readonly spinnerService: NgxSpinnerService, private readonly router: Router) { }

  unsetOptionals(): void {
    this.searchForm.controls.language.setValue('');
    this.searchForm.controls.minStars.setValue(0);
  }

  getRepos(): void {
    const controls = this.searchForm.controls;
    this.spinnerService.show();
    this.repos = undefined;
    this.repoService.getRepos(controls.name.value || '', controls.language.value || '', controls.minStars.value || 0, controls.issuetitle.value || '').subscribe({
      next: (repos: any) => {
        this.repos = repos?.items?.map((item: any) => new Repo(item.name, item.owner.avatar_url, new Date(item.created_at))) || [];
      },
      error: () => {
        console.log('TODO ERROR')
      },
      complete: () => this.spinnerService.hide()
    });
  }

  goToCommits(repoName: string): void {
    this.spinnerService.show();
    this.router.navigate(['commits'], { queryParams: { repoName } });
  }
}
