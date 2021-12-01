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
    { name: 'blue-orange'        , display: 'Azul & Laranja'                       },
    { name: 'blue-orange-dark'   , display: 'Azul & Laranja (Modo Escuro)'         },
    { name: 'deep-purple-amber'  , display: 'Roxo & Âmbar'                         },
    { name: 'indigo-pink'        , display: 'Índigo & Pink'                        },
    { name: 'pink-blue-gray-dark', display: 'Pink & Azul Acizentado (Modo Escuro)' },
    { name: 'purple-green-dark'  , display: 'Roxo & Verde (Modo Escuro)'           },
    { name: 'mono-red'           , display: 'Mono Red'                             , icon: 'R' },
    { name: 'mono-red-dark'      , display: 'Mono Red (Modo Escuro)'               , icon: 'R' },
    { name: 'mono-blue'          , display: 'Mono Blue'                            , icon: 'U' },
    { name: 'mono-blue-dark'     , display: 'Mono Blue (Modo Escuro)'              , icon: 'U' },
  ];

  private _mainTheme$: BehaviorSubject<string> = new BehaviorSubject('blue-orange');
  private _renderer: Renderer2;
  private head: HTMLElement;
  private themeLinks: HTMLElement[] = [];
  private restoreTheme: boolean = true;

  theme$: Observable<[string]>;

  constructor(
    rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) document: Document
  ) {
    this.head = document.head;
    this._renderer = rendererFactory.createRenderer(null, null);

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
    this._mainTheme$.next(name);
  }

  getCurrentTheme(): string {
    return this._mainTheme$.value;
  }

  getThemeList() {
    return this.THEMES;
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
