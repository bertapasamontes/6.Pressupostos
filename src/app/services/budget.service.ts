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
    

    console.log("..... fin calcular coste adicional....");
    return this.costesAdicionalesServicio.next(additional);
  }


  devuelvemeMiDinero(numPages:number, numLanguajes:number){
    let additional = - (numPages * numLanguajes * 30);

    return this.costesAdicionalesServicio.next(additional);
  }

  calculameElCosteDeLaWeb(costes:number){
    let presuNuevo = this.totalPresuServicio.value + costes;
    return this.totalPresuServicio.next(presuNuevo);
  }

  resetPresu(){
    this.totalPresuServicio.next(0);
  }


  //----------------- numPages y numLanguajes --------------------------
  // Valores de páginas y lenguajes seleccionados
  private numPagesSource = new BehaviorSubject<number>(1); // Valor inicial
  private numLanguajesSource = new BehaviorSubject<number>(0); // Valor inicial

  numPages$ = this.numPagesSource.asObservable();
  numLanguajes$ = this.numLanguajesSource.asObservable();

  // Métodos para actualizar y obtener los valores
  setNumPages(value: number) {
    this.numPagesSource.next(value);
  }

  getNumPages(): number {
    return this.numPagesSource.value;
  }

  setNumLanguajes(value: number) {
    this.numLanguajesSource.next(value);
  }

  getNumLanguajes(): number {
    return this.numLanguajesSource.value;
  }

  resetPagesAndLanguajes(){
    
    this.setNumLanguajes(0);
    this.setNumPages(1);
    console.log("pages: ", this.numPagesSource.value)
    console.log("Languajes: ", this.numLanguajesSource.value)
    console.log("resetnumpagesandlanguajes function is called");
  }


  constructor() { }
}
