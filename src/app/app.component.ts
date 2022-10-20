import { Component } from '@angular/core';
import { Router,NavigationEnd  } from '@angular/router';
import { filter } from 'rxjs/operators';

enum Routes {
  main = '/main',
  repos = '/repos'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentRoute?: string;
  Routes = Routes;

  constructor(private readonly router: Router) {
    this.router.events.pipe(filter((event:any) => event instanceof NavigationEnd)).subscribe((event: any) => this.currentRoute = event.url);
  }
}
