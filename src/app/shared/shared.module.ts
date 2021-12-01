import { IconModule } from './../modules/icon.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../modules/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// const sharedComponents = [];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    IconModule
  ],
  // declarations: sharedComponents,
  exports: [MaterialModule, FlexLayoutModule]
})
export class SharedModule { }
