import { IconModule } from './../modules/icon.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../modules/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalAlertComponent } from './modal-alert/modal-alert.component';
import { ModalConfirmComponent } from './modal-confirm/modal-confirm.component';
import { ModalSpinnerComponent } from './modal-spinner/modal-spinner.component';

// const sharedComponents = [];

@NgModule({
  declarations: [
    ModalAlertComponent,
    ModalConfirmComponent,
    ModalSpinnerComponent
  ],
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
