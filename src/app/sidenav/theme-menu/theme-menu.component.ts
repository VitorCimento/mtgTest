import { Theme } from './../../shared/services/theme-switch.service';
import { Component, OnInit } from '@angular/core';
import { ThemeSwitchService } from 'src/app/shared/services/theme-switch.service';

@Component({
  selector: 'app-theme-menu',
  templateUrl: './theme-menu.component.html',
  styleUrls: ['./theme-menu.component.scss']
})
export class ThemeMenuComponent implements OnInit {
  themes: Theme[];

  constructor(private themeSwitch: ThemeSwitchService) {
    this.themes = this.themeSwitch.getThemeList();
  }

  ngOnInit(): void {
  }

  changeTheme(theme: string) {
    this.themeSwitch.setMainTheme(theme);
  }
}
