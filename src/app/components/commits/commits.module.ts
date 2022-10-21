import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared/shared.module';
import { CommitsComponent } from './commits.component';
import { CommitsService } from './services/commits.service';

@NgModule({
  declarations: [CommitsComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: CommitsComponent }])
  ],
  providers: [CommitsService]
})
export class CommitsModule { }
