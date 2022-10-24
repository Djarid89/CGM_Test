import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableService } from '../../shared/services/table.service';
import { GetReposData } from './interface/repos';

import { ReposComponent } from './repos.component';
import { ReposService } from './services/repos.service';

describe('ReposComponent', () => {
  let component: ReposComponent;
  let fixture: ComponentFixture<ReposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReposComponent ],
      imports: [HttpClientModule],
      providers: [ReposService, TableService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should unset language and min stars', () => {
    component.unsetOptionals();
    const result = component.form.controls.language.value === '' && component.form.controls.minStars.value === 0;
    expect(result).toBeTrue();
  });

  it('should addRepos() add page', () => {
    component.data = new GetReposData('', '', 0, '');
    const prevPage = component.data.page;
    component.addRepos();
    expect(component.data.page === prevPage + 1).toBeTrue();
  });
});
