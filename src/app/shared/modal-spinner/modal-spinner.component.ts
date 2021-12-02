import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

interface SpinnerData{
  type?: string;
}

@Component({
  selector: 'app-modal-spinner',
  templateUrl: './modal-spinner.component.html',
  styleUrls: ['./modal-spinner.component.scss']
})
export class ModalSpinnerComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: SpinnerData
  ) { }

  ngOnInit(): void {
  }

}
