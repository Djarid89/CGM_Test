import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableReposComponent } from './table-repos.component';

describe('TableReposComponent', () => {
  let component: TableReposComponent;
  let fixture: ComponentFixture<TableReposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableReposComponent ]
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
