import { Component} from '@angular/core';
import { BudgetService } from '../../services/budget.service';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, NonNullableFormBuilder} from '@angular/forms';

@Component({
  selector: 'app-panel',
  imports: [ReactiveFormsModule],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss'
})
export class PanelComponent {
  numPages = 1;

  //deshabilitar boton - en el 0
  isUnchanged: boolean = true;
  
  //constructor para habilitar renderer y poder añadir clases + usar servicio
  constructor(
    private totalPresu: BudgetService,
    private costesAdicionales: BudgetService
  ){}
  coste:number = 0;
  totalPresuValor:number = 0;

  //form
  formWeb:FormGroup |any;

  ngOnInit():void{
    //nos suscribimos
    this.totalPresu.totalPresu$.subscribe(total => {
      this.totalPresuValor = total;  // se actualiza el valor cuando cambia
    });
    this.costesAdicionales.costeAdicional$.subscribe(total => {
      this.coste = total;  // Se actualiza el valor cuando cambia
    });

    this.formWeb = new FormGroup({
      numberOfPages: new FormControl(this.numPages),
      numberOfLanguajes: new FormControl(this.numLanguajes)

    });

    // vemos los cambios del form
    this.formWeb.valueChanges.subscribe((values: 
      { numberOfPages: number; 
        numberOfLanguajes: number; 
      }) => {
      console.log('form actualizado:', values);

      //*Cambios automaticos:* / se actualizan los valores del form y se recalcula el total
      this.numPages = values.numberOfPages || 0;
      this.numLanguajes = values.numberOfLanguajes || 0;

      this.recalcularTotal();
    });

    // Escuchar cambios del servicio
    this.totalPresu.totalPresu$.subscribe(total => {
      this.totalPresuValor = total;
    });
    this.costesAdicionales.costeAdicional$.subscribe(total => {
      this.coste = total;  // Se actualiza el valor cuando cambia
      console.log("coste actualizado: ", this.coste);
    });
  };


  recalcularTotal(): void {
    console.log("---- recalcular total ------");
    // this.totalPresuValor = 0;
    console.log("total costes: ", this.coste);
    this.totalPresu.calculameElCosteDeLaWeb(this.coste);
    console.log("total costes2: ", this.coste);

    console.log('Nuevo total recalculado:', this.totalPresuValor);
    console.log("---- fin recalcular total ------");
  }

  addPage():any{ 
    this.costesAdicionales.calculaCosteAdicional(this.numPages, this.numLanguajes);
    this.totalPresu.calculameElCosteDeLaWeb(this.coste);

    this.numPages++;
    return this.numPages;
  }

  removePage():any{
    
    if(this.numPages < 1){
      console.log("menor a 1")
      return this.numPages = 1;
    }
       this.numPages--;
    this.costesAdicionales.devuelvemeMiDinero(this.numPages, this.numLanguajes);
    this.totalPresu.calculameElCosteDeLaWeb(this.coste);
 
    return this.numPages;
  }

  numLanguajes = 0;

  addLanguaje():any{
    this.isUnchanged = false;
    this.numLanguajes++;
    this.costesAdicionales.calculaCosteAdicional(this.numPages, this.numLanguajes);
    this.totalPresu.calculameElCosteDeLaWeb(this.coste);

    return this.numLanguajes;
  }
  removeLanguaje():any{
    this.costesAdicionales.devuelvemeMiDinero(this.numPages, this.numLanguajes);
    if(this.numLanguajes < 1){
      console.log("menor a 1")
      this.isUnchanged = true;
      this.numLanguajes = 0;
    }
    else {
      this.numLanguajes--;
    }
    this.totalPresu.calculameElCosteDeLaWeb(this.coste);

    return this.numLanguajes;
  }

  
}

