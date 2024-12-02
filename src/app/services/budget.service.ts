import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  private totalPresuServicio = new BehaviorSubject<number>(0);

  totalPresu$ = this.totalPresuServicio.asObservable(); //le decimos que es observable para que los componentes se puedan suscribir.

  //cuando se suscriban, reciben el numerito del total
  getTotalPresu():number{
    return this.totalPresuServicio.value;
  }

  //actulizar numerito del total
  setTotalPresu(value:number){
    return this.totalPresuServicio.next(value);
  }

  //sumar
  sumameEstoAlPresu(value:number){
    return this.totalPresuServicio.next(this.totalPresuServicio.value + value);
  }

  //restar
  restameEstoDelPresu(value:number){
    return this.totalPresuServicio.next(this.totalPresuServicio.value - value);
  }

  calculameElCosteDeLaWeb(numPages:number, numLanguajes:number){
    console.log("pages: ",numPages);
    console.log("languajes: ",numLanguajes);
    let presuNuevo = this.totalPresuServicio.value + (numPages * numLanguajes * 30)
    return this.totalPresuServicio.next(presuNuevo);
  }

  devuelvemeMiDinero(numPages:number, numLanguajes:number){
    console.log("pages: ",numPages);
    console.log("languajes: ",numLanguajes);
    let presuNuevo = this.totalPresuServicio.value - (numPages * numLanguajes * 30+30)
    return this.totalPresuServicio.next(presuNuevo);
  }

  constructor() { }
}
