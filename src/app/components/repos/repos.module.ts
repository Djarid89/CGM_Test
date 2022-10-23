import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TableService } from 'src/app/shared/services/table.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { TableReposComponent } from './components/table-repos/table-repos.component';
import { ReposComponent } from './repos.component';
import { ReposService } from './services/repos.service';

@NgModule({
  declarations: [ReposComponent, TableReposComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: ReposComponent }])
  ],
  providers: [ReposService, TableService]
})
export class ReposModule { }
