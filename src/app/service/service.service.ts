import { TmplAstTextAttribute } from '@angular/compiler';
import { Injectable } from '@angular/core';
import {Todo} from 'src/app/interface/todo'

let lista:Todo[]=[]
//lista generica delle task
let ids:number
//valore utilizzato per identificazione dei singoli oggetti
let listacompletati:Todo[]=[]
//lista delle sole task completate
let listaNonCompletati:Todo[]=[]
//lista delle sole task non completate

//controllo degli oggetti nella lista task generica
export async function control(){
  if(lista.length===0){
    //se la lista ha 0 oggetti, l'identificativo viene settato a zero
    ids=0
  }
  else if(lista.length>=1){
   /*  se la lista ha almeno un oggetto, viene pescato l'id dell'ultimo oggetto nella lista ed usato come riferimento
   per l'aggiunta di quello successivo, cosi da non creare id doppi */
   ids=(lista[lista.length-1].id+1)
  }
}

//funzione usata per inviare la lista generica delle task, per successiva stampa a video degli oggetti
export async function stampa() {
    return await (new Promise<Todo[]>((res)=>{
        setTimeout(()=>{
            res(lista)
        },2000)
    }))
}

//aggiunta di task alla lista generica
export async function annotazione(oggettoToDo:string){
  return await (new Promise<Todo[]>(()=>{
    //l'oggetto(task) creato viene inserito nella lista generica
    lista.push({id:ids,title:oggettoToDo,completed:false})
    //l'oggetto(task) creato viene inserito nella lista non completati
    listaNonCompletati.push({id:ids,title:oggettoToDo,completed:false})
    return lista
  }))
}

//alterazione del valore nell'attributo completed da false a true, per i singoli oggetti nella task generica
export async function completa(index:number) {
    return await (new Promise<Todo[]>(()=>{
      //identificazione dell'indice dell'oggetto nella lista generica
      let numero =lista.findIndex(x => x.id == index)
      //identificazione dell'indice dell'oggetto nella lista non completati
      let numeroNon=listaNonCompletati.findIndex(x => x.id == index)
      //successiva alterazione del valore nell'attributo
      lista[numero].completed=true
      //la task completata, viene rimossa dai task non completati
      listaNonCompletati.splice(numeroNon,1)
      //aggiunto alla lista dei completati
      listacompletati.push(lista[numero])
      //gli oggetti ven
      return lista
    }))
}

//funzione usata per inviare la lista delle task completate per calcolo numerico e stampa del valore nella navbar
export async function prendiCompleti() {
  return await (new Promise<Todo[]>((res)=>{
    setTimeout(()=>{
      res(listacompletati)
    },2000)
  }))
}

//funzione usata per inviare la lista delle task non completate per calcolo numerico e stampa del valore nella navbar
export async function getNonCompleati() {
  return await (new Promise<Todo[]>((res)=>{
    setTimeout(()=>{
      res(listaNonCompletati)
    },2000)
  }))
}
//rimozione del task completato
export async function rimuoviTaskCompletati(index:number) {
  return await (new Promise<Todo[]>(()=>{
    //identificazione dell'indice dell'oggetto nella lista generica
    let numero =lista.findIndex(x => x.id == index)
    //la task completata, viene rimossa dalla lista generica
    lista.splice(numero,1)
    //identificazione dell'indice dell'oggetto nella lista completati
    let numeroCom =listacompletati.findIndex(x => x.id == index)
    //la task completata, viene rimossa dai task completati
    listacompletati.splice(numeroCom,1)

    return lista
  }))
}
export async function rimuoviTaskNonCompletati(index:number) {
  return await (new Promise<Todo[]>(()=>{
    //identificazione dell'indice dell'oggetto nella lista generica
    let numero =lista.findIndex(x => x.id == index)
    //la task non completata, viene rimossa dalla lista generica
    lista.splice(numero,1)
    //identificazione dell'indice dell'oggetto nella lista non completati
    let numeroCom =listacompletati.findIndex(x => x.id == index)
    //la task non completata, viene rimossa dai task non completati
    listaNonCompletati.splice(numeroCom,1)

    return lista
  }))
}
