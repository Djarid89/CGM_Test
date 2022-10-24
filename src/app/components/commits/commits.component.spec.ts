import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { TableService } from '../../shared/services/table.service';

import { CommitsComponent } from './commits.component';
import { GetCommitData } from './interface/commits';
import { CommitsService } from './services/commits.service';

describe('CommitsComponent', () => {
  let component: CommitsComponent;
  let fixture: ComponentFixture<CommitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommitsComponent ],
      imports: [HttpClientModule],
      providers: [
        { provide: ActivatedRoute, useValue: { queryParams: of( { repoName: "repoName" } ) }},
        CommitsService,
        TableService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should addCommits() add page', () => {
    component.data = new GetCommitData('repoName');
    const prevPage = component.data.page;
    component.addCommits();
    expect(component.data.page === prevPage + 1).toBeTrue();
  });
});
