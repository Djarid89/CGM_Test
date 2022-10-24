import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableService } from '../../../../shared/services/table.service';
import { ReposService } from '../../services/repos.service';

import { TableReposComponent } from './table-repos.component';

describe('TableReposComponent', () => {
  let component: TableReposComponent;
  let fixture: ComponentFixture<TableReposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableReposComponent ],
      providers: [ ReposService, TableService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableReposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
