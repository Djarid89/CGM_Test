import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CommitsComponent } from './commits.component';
import { CommitsService } from './services/commits.service';
import { TableCommitsComponent } from './components/table-commits/table-commits.component';
import { TableService } from 'src/app/shared/services/table.service';

@NgModule({
  declarations: [CommitsComponent, TableCommitsComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: CommitsComponent }])
  ],
  providers: [CommitsService, TableService]
})
export class CommitsModule { }
