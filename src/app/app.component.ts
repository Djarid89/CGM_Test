import { Component, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { SharedService } from './shared/shared/shared.service';

enum RoutesPath {
  main = '/main',
  repos = '/repos',
  commits = '/commits'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  currentRoute?: string;
  RoutesPath = RoutesPath;
  isVisible = false;
  navCommitisVisible: Subscription;

  constructor(private readonly router: Router, readonly sharedService: SharedService) {
    this.router.events.pipe(filter((event:any) => event instanceof NavigationEnd)).subscribe((event: any) => this.currentRoute = event.url.split('?')[0]);
    this.navCommitisVisible = this.sharedService.navCommitisVisible$.subscribe({
      next: (isVisible: boolean) => setTimeout(() => { this.isVisible = isVisible})
    })
  }

  ngOnDestroy(): void {
    this.navCommitisVisible?.unsubscribe();
  }
}
