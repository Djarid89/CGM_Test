import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'repos', loadChildren: () => import('./components/repos/repos.module').then(m => m.ReposModule) },
  { path: 'commits', loadChildren: () => import('./components/commits/commits.module').then(m => m.CommitsModule) },
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: '**', redirectTo: 'main', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
