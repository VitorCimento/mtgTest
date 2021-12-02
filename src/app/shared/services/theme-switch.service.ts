import { async } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';

export interface Theme {
  name: string;
  display: string;
  icon?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeSwitchService {
  private readonly THEMES: Theme[] = [
    { name: 'mono-red'     , display: 'Mono Red'              , icon: 'R'  },
    { name: 'mono-blue'    , display: 'Mono Blue'             , icon: 'U'  },
    { name: 'mono-green'   , display: 'Mono Green'            , icon: 'G'  },
    { name: 'mono-white'   , display: 'Mono White'            , icon: 'W'  },
    { name: 'mono-black'   , display: 'Mono Black'            , icon: 'B'  },
    { name: 'golgari-bdom' , display: 'Golgari (B Dominante)' , icon: 'BG' },
    { name: 'golgari-gdom' , display: 'Golgari (G Dominante)' , icon: 'BG' },
    { name: 'rakdos-bdom'  , display: 'Rakdos (B Dominante)'  , icon: 'BR' },
    { name: 'rakdos-rdom'  , display: 'Rakdos (R Dominante)'  , icon: 'BR' },
    { name: 'selesnya-gdom', display: 'Selesnya (G Dominante)', icon: 'GW' },
    { name: 'selesnya-wdom', display: 'Selesnya (W Dominante)', icon: 'GW' },
    { name: 'gruul-rdom'   , display: 'Gruul (R Dominante)'   , icon: 'RG' },
    { name: 'gruul-gdom'   , display: 'Gruul (G Dominante)'   , icon: 'RG' },
    { name: 'boros-rdom'   , display: 'Boros (R Dominante)'   , icon: 'RW' },
    { name: 'boros-wdom'   , display: 'Boros (W Dominante)'   , icon: 'RW' },
    { name: 'dimir-udom'   , display: 'Dimir (U Dominante)'   , icon: 'UB' },
    { name: 'dimir-bdom'   , display: 'Dimir (P Dominante)'   , icon: 'UB' },
    { name: 'izzet-udom'   , display: 'Izzet (U Dominante)'   , icon: 'UR' },
    { name: 'izzet-rdom'   , display: 'Izzet (R Dominante)'   , icon: 'UR' },
    { name: 'orzhov-wdom'  , display: 'Orzhov (W Dominante)'  , icon: 'WB' },
    { name: 'orzhov-bdom'  , display: 'Orzhov (B Dominante)'  , icon: 'WB' },
    { name: 'azorius-wdom' , display: 'Azorius (W Dominante)' , icon: 'WU' },
    { name: 'azorius-udom' , display: 'Azorius (U Dominante)' , icon: 'WU' },
  ];

  private _mainTheme$: BehaviorSubject<string> = new BehaviorSubject('blue-orange');
  private _renderer: Renderer2;
  private head: HTMLElement;
  private themeLinks: HTMLElement[] = [];
  private isDarkMode: boolean = false;

  theme$: Observable<[string]>;

  constructor(
    rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) document: Document
  ) {
    this.head = document.head;
    this._renderer = rendererFactory.createRenderer(null, null);
    this.isDarkMode = localStorage.getItem('darkMode') ? JSON.parse(localStorage.getItem('darkMode')!) === true : false;

    if( localStorage.getItem('currentTheme') ) {
      this.setMainTheme(localStorage.getItem('currentTheme')!);
    }

    this.theme$ = combineLatest([this._mainTheme$]);
    this.theme$.subscribe(
      async ([mainTheme]) => {
        await this.loadCss(mainTheme);
        if ( this.themeLinks.length == 2 ) {
          this._renderer.removeChild(this.head, this.themeLinks.shift());
        }
      }
    );
  }

  setMainTheme(name: string) {
    const position = name.indexOf('-dark');

    if (this.isDarkMode) {
      name = position > -1 ? name : `${name}-dark`;
    } else {
      name = position > -1 ? name.slice(0, position) : name;
    }

    this._mainTheme$.next(name);
  }

  getCurrentTheme(): string {
    return this._mainTheme$.value;
  }

  darkModeToogle() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', this.isDarkMode ? 'true' : 'false');
    // let theme = this.getCurrentTheme();
    // const position = theme.indexOf('-dark');

    // theme = position > 0 ? theme.slice(0, position) : `${theme}-dark`;

    // this.setMainTheme(theme);
    this.setMainTheme(this.getCurrentTheme());
  }

  getThemeList() {
    return this.THEMES;
  }

  getDarkMode(): boolean {
    return this.isDarkMode;
  }

  getLightThemesList() {
    return this.THEMES.filter(
      (theme) => {
        return theme.name.indexOf('dark') <= 0;
      }
    );
  }

  getDarkThemesList() {
    return this.THEMES.filter(
      (theme) => {
        return theme.name.indexOf('dark') > 0;
      }
    );
  }

  private async loadCss(themeName: string) {
    return new Promise(resolve => {
      const fileName = `theme-${themeName}.css`;
      const linkEl: HTMLElement = this._renderer.createElement('link');
      this._renderer.setAttribute(linkEl, 'rel', 'stylesheet');
      this._renderer.setAttribute(linkEl, 'type', 'text/css');
      this._renderer.setAttribute(linkEl, 'href', fileName);
      this._renderer.setProperty(linkEl, 'onload', resolve);
      this._renderer.appendChild(this.head, linkEl);
      this.themeLinks = [...this.themeLinks, linkEl];
      localStorage.setItem('currentTheme', themeName);
    })
  }

}
