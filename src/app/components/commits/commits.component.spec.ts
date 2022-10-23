import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitsComponent } from './commits.component';

describe('CommitsComponent', () => {
  let component: CommitsComponent;
  let fixture: ComponentFixture<CommitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommitsComponent ]
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
    const prevPage = component.data.page;
    component.addCommits();
    expect(component.data.page === prevPage + 1).toBeTrue();
  });
});
