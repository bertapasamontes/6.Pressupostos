import { Component} from '@angular/core';
import { BudgetService } from '../../services/budget.service';

@Component({
  selector: 'app-panel',
  imports: [],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss'
})
export class PanelComponent {
  numPages = 1;

  //deshabilitar boton - en el 0
  isUnchanged: boolean = true;
  
  //constructor para habilitar renderer y poder añadir clases + usar servicio
  constructor(
    private totalPresu: BudgetService
  ){}

  totalPresuValor:number = 0;
  ngOnInit():void{
    //nos suscribimos
    this.totalPresu.totalPresu$.subscribe(total => {
      this.totalPresuValor = total;  // Se actualiza el valor cuando cambia
    });
  };

  addPage():any{
    this.numPages++;

    
    this.totalPresu.calculameElCosteDeLaWeb(this.numPages, this.numLanguajes);
    console.log("presu: ", this.totalPresuValor);

    return this.numPages;
    
  }
  removePage():any{
    if(this.numPages < 2){
      console.log("menor a 1")
      return this.numPages = 1;
    }
    this.numPages--;

    this.totalPresu.devuelvemeMiDinero(this.numPages, this.numLanguajes);
    console.log("presu: ", this.totalPresuValor);

    return this.numPages;
  }

  numLanguajes = 0;

  addLanguaje():any{
    this.isUnchanged = false;
    this.numLanguajes++;

    this.totalPresu.calculameElCosteDeLaWeb(this.numPages, this.numLanguajes);
    console.log("presu: ", this.totalPresuValor);

    return this.numLanguajes;
  }
  removeLanguaje():any{

    if(this.numLanguajes < 1){
      console.log("menor a 1")
      this.isUnchanged = true;
      this.numLanguajes = 0;
      
    }
    else {this.numLanguajes--;}

    console.log("...");
    console.log("num languajes: ", this.numLanguajes);
    this.totalPresu.devuelvemeMiDinero(this.numPages, this.numLanguajes);
    console.log("presu: ", this.totalPresuValor);
    return this.numLanguajes;
  }
  
  

}
