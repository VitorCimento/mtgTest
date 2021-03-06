import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './shared/shared.module';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ThemeMenuComponent } from './sidenav/theme-menu/theme-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    ThemeMenuComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    SharedModule
  ],
  providers: [
    { provide: MATERIAL_SANITY_CHECKS, useValue: false }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
