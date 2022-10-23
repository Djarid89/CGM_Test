import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { TableService } from '../../services/table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {
  @Output() emitAddRows = new EventEmitter<void>();

  constructor(readonly tableService: TableService) { }

  addRepos(): void {
    this.emitAddRows.emit()
  }
}
