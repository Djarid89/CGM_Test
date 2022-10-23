import { Component, Injector, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ManualInjectorService } from './shared/services/manual-injector.service';
import { StoreService } from './shared/services/store.service';

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

  constructor(private readonly router: Router, readonly storeService: StoreService, private injector: Injector) {
    ManualInjectorService.injector = this.injector;
    this.router.events.pipe(filter((event:any) => event instanceof NavigationEnd)).subscribe((event: any) => this.currentRoute = event.url.split('?')[0]);
    this.navCommitisVisible = this.storeService.navCommitisVisible$.subscribe({
      next: (isVisible: boolean) => setTimeout(() => { this.isVisible = isVisible})
    })
  }

  ngOnDestroy(): void {
    this.navCommitisVisible?.unsubscribe();
  }
}
