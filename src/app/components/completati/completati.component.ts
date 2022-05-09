import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/interface/todo';
import {stampa} from 'src/app/service/service.service';
import * as Service from 'src/app/service/service.service';

@Component({
  templateUrl: './completati.component.html',
  styleUrls: ['./completati.component.scss']
})
export class CompletatiComponent implements OnInit {
  lista:Todo[]=[]
  caricamentoPage!:boolean
  taskcompleti!:number
  carica!:number
  tempo:number=1

  constructor() {
    //la lista generica e dei completati nella componente completed viene eguagliata a quella nella service
    stampa().then((lista)=>{
      this.lista=lista
      this.taskcompleti=this.lista.findIndex(x => x.completed == true)
    })
    this.caricamento()
  }
  //funzione usata per la gestione caricamento delal pagina
  caricamento(){
    this.caricamentoPage=true
    setInterval(()=>{
      this.tempo++
      this.carica=parseInt((Math.round(2 * 100) / (this.tempo*2)).toFixed(2))
    },15)
    setTimeout(() => {
      this.caricamentoPage=false
    }, 2000);
  }

  rimozione(id:number){
    setTimeout(() => {
      //va a rimuovere l'oggetto dalla lista generica
      Service.rimuoviTaskCompletati(id).then((completo:Todo[])=>{
        //la lista nella componente dei completati viene eguagliata a quella generica nel service
        this.lista=completo
      })
    }, 2000);
  }

  ngOnInit(): void {
  }

}
