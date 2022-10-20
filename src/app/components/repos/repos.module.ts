import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReposComponent } from './repos.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ReposComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ReposComponent }])
  ]
})
export class ReposModule { }
