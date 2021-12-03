import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { MessagesService } from '../services/messages.service';

export interface ExecData {
  observable: Observable<any>;
  notValidateForm?: boolean;
  name?: string | null;
  params?: any
}

export interface CallBackData {
  data: any;
  name?: string | null;
  params?: any;
}

@Component({ template: '' })
export abstract class CompBase implements OnInit, OnDestroy {
  @ViewChild(FormGroupDirective) myForm!: FormGroupDirective;

  form!: FormGroup;
  reqActives: number = 0;
  protected spinner: any = null;
  private subscription$: Subscription = new Subscription();

  constructor(
    protected msgService: MessagesService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  protected abstract initForm(): void;

  protected openRequest(): void {
    this.reqActives++;
    if (this.reqActives > 0 && !this.spinner) {
      this.spinner = this.msgService.showSpinner();
    }
  }

  protected closeRequest(): void {
    this.reqActives--;

    if (this.reqActives == 0 && this.spinner) {
      this.spinner.close();
      this.spinner = null;
    }
  }

  public execObservable(execData: ExecData): void {
    if (execData.notValidateForm || this.form.valid) {
      this.openRequest();

      this.subscription$.add(
        execData.observable.subscribe(
          (success) => this.successCallback({ data: success, name: execData.name, params: execData.params }),
          (error) => this.errorCallback( {data: error, name: execData.name, params: execData.params })
        ).add(() => this.closeRequest())
      );
    } else {
      this.formInvalid();
    }
  }

  public abstract successCallback(success: CallBackData): void;
  public abstract errorCallback(error: CallBackData): void;

  public formInvalid(): void {
    this.msgService.showSnackBar(
      {
        message: 'Verifique as informações digitadas e tente novamente !',
        verticalPosition: 'top',
        horizontalPosition: 'center'
      }
    );
  }

  public resetForm(): void {
    this.myForm.reset();
  }

}
