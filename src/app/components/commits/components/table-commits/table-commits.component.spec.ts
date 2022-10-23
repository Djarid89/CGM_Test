import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCommitsComponent } from './table-commits.component';

describe('TableCommitsComponent', () => {
  let component: TableCommitsComponent;
  let fixture: ComponentFixture<TableCommitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableCommitsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableCommitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
