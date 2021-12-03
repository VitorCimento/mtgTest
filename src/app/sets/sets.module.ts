import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ListaComponent } from './lista/lista.component';
import { SetsRoutingModule } from './sets-routing.module';


@NgModule({
  declarations: [
    ListaComponent
  ],
  imports: [
    CommonModule,
    SetsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    ScrollingModule
  ]
})
export class SetsModule { }
