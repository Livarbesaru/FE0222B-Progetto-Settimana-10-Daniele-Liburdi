import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/interface/todo';
import * as Service from 'src/app/service/service.service'
import { TodoComponent } from '../todo/todo.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  lista!: Todo[];
  listacompletati!: Todo[];
  listaNoncompletati!:Todo[]
  constructor() {
    //la lista nella componente navbar viene eguagliata a quella nella service
    Service.stampa().then((lista) => {
      this.lista = lista;
    });
    //la lista dei completati nella componente navbar viene eguagliata a quella nella service
    Service.prendiCompleti().then((listaTask) =>{
      this.listacompletati=listaTask
    })
    //la lista dei non completati nella componente navbar viene eguagliata a quella nella service
    Service.getNonCompleati().then((listaNon)=>{
      this.listaNoncompletati=listaNon
    })
  }
  ngOnInit(): void {}
}
