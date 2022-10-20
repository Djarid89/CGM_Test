import { NgModule } from '@angular/core';
import { CommitsComponent } from './commits.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CommitsComponent],
  imports: [
    RouterModule.forChild([{ path: '', component: CommitsComponent }])
  ]
})
export class CommitsModule { }
