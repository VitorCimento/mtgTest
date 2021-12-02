import { ModalSpinnerComponent } from './../modal-spinner/modal-spinner.component';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AlertData, ModalAlertComponent } from '../modal-alert/modal-alert.component';
import { ConfirmData, ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';

export enum AlertTypes {
  WARNING = 'warn',
  ACCENT  = 'accent',
  PRIMARY = 'primary',
  DEFAULT = '',
}

export interface ModalAlertData extends AlertData {
  width?: string;
}

export interface ModalConfirmData extends ConfirmData {
  width?: string;
}

export interface SnackbarData {
  message: string;
  buttonClose?: string;
  duration?: number;
  horizontalPosition?: MatSnackBarHorizontalPosition;
  verticalPosition?: MatSnackBarVerticalPosition;
}

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  showConfirm(md: ModalConfirmData) {
    md.question = Array.isArray(md.question) ? md.question : new Array<string>(md.question);
    return this.dialog.open(ModalConfirmComponent, {
      width: md.width || '300px',
      panelClass: ['dialog-message'],
      disableClose: true,
      data: md
    });
  }

  showMessage(md: ModalAlertData) {
    return this.dialog.open(ModalAlertComponent, {
      width: md.width || '300px',
      panelClass: ['dialog-message'],
      data: md
    });
  }

  showSnackBar(snack: SnackbarData) {
    return this._snackBar.open(
      snack.message,
      snack.buttonClose || 'Fechar',
      {
        duration: snack.duration || 0,
        horizontalPosition: snack.horizontalPosition || 'end',
        verticalPosition: snack.verticalPosition || 'top',
      });
  }

  showSpinner(type?: string) {
    return this.dialog.open(ModalSpinnerComponent, {
      panelClass: 'spinner-dialog',
      disableClose: true,
      data: { type: type }
    });
  }
}
