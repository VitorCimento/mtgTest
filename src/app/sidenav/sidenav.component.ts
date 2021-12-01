import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ThemeSwitchService } from '../shared/services/theme-switch.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @ViewChild('drawer') drawer!: MatSidenav;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private themeService: ThemeSwitchService
  ) { }

  ngOnInit(): void {
  }

  darkModeToogle() {
    return this.themeService.darkModeToogle();
  }

  getDarkMode() {
    return this.themeService.getDarkMode();
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

}
