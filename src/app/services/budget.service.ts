import { Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  private totalPresuServicio = new BehaviorSubject<number>(0);
  private costesAdicionalesServicio= new BehaviorSubject<number>(0);

  totalPresu$ = this.totalPresuServicio.asObservable(); //le decimos que es observable para que los componentes se puedan suscribir.

  costeAdicional$ = this.costesAdicionalesServicio.asObservable(); //le decimos que es observable para que los componentes se puedan suscribir.

  //cuando se suscriban, reciben el numerito del total
  getTotalPresu():number{
    return this.totalPresuServicio.value;
  }

  //actulizar numerito del total
  setTotalPresu(value:number){
    return this.totalPresuServicio.next(value);
  }

  //cuando se suscriban, reciben el numerito del coste adicional
  getCostesAdicionales():number{
    return this.costesAdicionalesServicio.value;
  }

  //actulizar numerito del coste adicional
  setCostesAdicionales(value:number){
    return this.costesAdicionalesServicio.next(value);
  }

  //sumar
  sumameEstoAlPresu(value:number){
    console.log("sumame al presu: ",value);
    return this.totalPresuServicio.next(this.totalPresuServicio.value + value);
  }

  //restar
  restameEstoDelPresu(value:number){
    console.log("restame del presu: ", value);
    return this.totalPresuServicio.next(this.totalPresuServicio.value - value);
  }

  calculaCosteAdicional(numPages:number, numLanguajes:number){
    console.log("..... calcular coste adicional....");

    let additional = numPages * numLanguajes * 30;

    this.costesAdicionalesServicio.next(additional);

    console.log("..... fin calcular coste adicional....");
  }


  devuelvemeMiDinero(numPages:number, numLanguajes:number){
    let additional = - (numPages * numLanguajes * 30);

    return this.costesAdicionalesServicio.next(additional);
  }
  // devuelvemeMiDinero(numPages:number, numLanguajes:number){
  //   console.log("nº pages: ",numPages);
  //   console.log("nº languajes: ",numLanguajes);
  //   let costeNuevo = this.costesAdicionalesServicio.value - (numPages * numLanguajes * 30+30);
  //   console.log("costes adicionales: ", this.costesAdicionalesServicio.value);

  //   return this.costesAdicionalesServicio.next(costeNuevo);
  // }
  calculameElCosteDeLaWeb(costes:number){
    let presuNuevo = this.totalPresuServicio.value + costes;
    return this.totalPresuServicio.next(presuNuevo);
  }

  // calculameElCosteDeLaWeb(numPages:number, numLanguajes:number){
  //   console.log("pages: ",numPages);
  //   console.log("languajes: ",numLanguajes);
  //   let presuNuevo = this.totalPresuServicio.value + this.costesAdicionales.value;
  //   return this.totalPresuServicio.next(presuNuevo);
  // }

  // devuelvemeMiDinero(numPages:number, numLanguajes:number){
  //   console.log("pages: ",numPages);
  //   console.log("languajes: ",numLanguajes);
  //   let presuNuevo = this.totalPresuServicio.value - (numPages * numLanguajes * 30+30)
  //   return this.totalPresuServicio.next(presuNuevo);
  // }

  constructor() { }
}
