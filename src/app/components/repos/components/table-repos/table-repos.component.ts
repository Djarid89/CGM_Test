import { Component, Input } from '@angular/core';
import { TableService } from 'src/app/shared/services/table.service';
import { Repo } from '../../class/repos';

@Component({
  selector: 'app-table-repos',
  templateUrl: './table-repos.component.html',
  styleUrls: ['./table-repos.component.scss']
})
export class TableReposComponent {
  @Input() repos: Repo[] = [];

  constructor(readonly tableService: TableService) { }

  goToCommits(repoName: string): void {
    this.tableService.goToCommits$.next(repoName);
  }

  addRepos(): void {
    this.tableService.addRepos$.next();
  }

}
