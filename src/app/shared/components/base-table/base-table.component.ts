import { Component, OnInit } from '@angular/core';
import { GetData } from '../../interface/shared';
import { TableService } from '../../services/table.service';

@Component({
  selector: 'app-base-table',
  templateUrl: './base-table.component.html',
  styleUrls: ['./base-table.component.scss'],

})
export abstract class BaseTableComponent {
  abstract data: GetData;

  addRows(reposData: GetData, tableService: TableService): void {
    reposData.page++;
    tableService.IsVisible$.next(false);
  }

}
