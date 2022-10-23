import { Component, Input, OnInit } from '@angular/core';
import { Commit } from '../../class/commits';

@Component({
  selector: 'app-table-commits',
  templateUrl: './table-commits.component.html',
  styleUrls: ['./table-commits.component.scss']
})
export class TableCommitsComponent {
  @Input() commits: Commit[] = []; 

}
