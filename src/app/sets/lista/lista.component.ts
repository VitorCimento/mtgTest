import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CallBackData, CompBase } from 'src/app/shared/classes/comp-base';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { ThemeSwitchService } from 'src/app/shared/services/theme-switch.service';

import { MtgAllSets, SetsService, MtgSet } from '../sets.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent extends CompBase implements OnInit, OnDestroy {
  sets!: MtgAllSets;
  displayedCols: string[] = [
    'icon',
    'name',
    'code',
    'released_at',
    'view_cards'
  ];
  rowOptions: number[] = [5];
  pageEvent: PageEvent = {
    length: 0,
    pageIndex: 0,
    pageSize: 5,
    previousPageIndex: 0
  };
  dataSource!: any;

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  constructor(
    protected msgService: MessagesService,
    protected setSetvice: SetsService,
    protected themeService: ThemeSwitchService
  ) {
    super(msgService);
  }

  protected initForm(): void {
    this.loadSets();
  }

  public loadSets() {
    this.execObservable(
      {
        observable: this.setSetvice.all(),
        name: 'setsList',
        notValidateForm: true,
      }
    );
  }

  private updateList(data: any) {
    this.sets = data;
    this.dataSource = new MatTableDataSource(this.sets.data);
    this.dataSource.paginator = this.paginator;
    this.pageEvent.length = data.data.length;
    this.rowOptions = [5];

    if (data.data.length > 10) { this.rowOptions.push(10) }
    if (data.data.length > 15) { this.rowOptions.push(15) }
    if (data.data.length > 25) { this.rowOptions.push(25) }
    if (data.data.length > 50) { this.rowOptions.push(50) }
    if (data.data.length > 100) { this.rowOptions.push(100) }
    this.rowOptions.push(data.data.length);
  }

  isDarkMode(): boolean {
    return this.themeService.getDarkMode();
  }

  public successCallback(success: CallBackData): void {
    switch(success.name) {
      case 'setsList':
        this.updateList(success.data);
        break;
    }
  }

  public errorCallback(error: CallBackData): void {
    switch(error.name) {
      case 'setsList':
        break;
    }
  }
}
