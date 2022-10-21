import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared/shared.module';
import { ReposComponent } from './repos.component';
import { ReposService } from './services/repos.service';

@NgModule({
  declarations: [ReposComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: ReposComponent }])
  ],
  providers: [ReposService]
})
export class ReposModule { }
