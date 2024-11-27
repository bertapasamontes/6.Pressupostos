import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-budgets-list',
  imports: [],
  templateUrl: './budgets-list.component.html',
  styleUrl: './budgets-list.component.scss'
})
export class BudgetsListComponent{
  [x: string]: any;
   
  sumaPresu:number = 0;

  
  totalPresu = 0;

  elegirServicio(value:number, event: Event):void{
    const checkbox2 = event.target as HTMLInputElement;
    if(checkbox2.checked){
      this.sumaPresu += value;
      console.log("suma presupuesto: ", this.sumaPresu);
      this.totalPresu = this.sumaPresu;
    } else{
      this.sumaPresu -=value;
      console.log("suma presupuesto: ", this.sumaPresu);
      this.totalPresu = this.sumaPresu;
    }
  }
  

}
