import { MessagesService } from './../../shared/services/messages.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {

  constructor(private msgService: MessagesService) { }

  ngOnInit(): void {
  }

}
