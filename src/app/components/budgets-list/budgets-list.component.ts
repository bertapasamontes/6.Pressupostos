import { Component, ElementRef, OnInit, ViewChild, Renderer2} from '@angular/core';
import { PanelComponent } from "../panel/panel.component";
import { BudgetService } from '../../services/budget.service';

@Component({
  selector: 'app-budgets-list',
  imports: [PanelComponent],
  templateUrl: './budgets-list.component.html',
  styleUrl: './budgets-list.component.scss'
})
export class BudgetsListComponent{
  [x: string]: any;

  servicios = [
    {
      nombre:"Seo",
      description:"Programació d'una pagina web responsive completa",
      valor: 300
    },
    {
      nombre:"Ads",
      description:"Programació d'una pagina web responsive completa",
      valor: 400
    },{
      nombre:"Web",
      description: "Programació d'una pagina web responsive completa",
      valor: 500
    },
  ];
   
  sumaPresu:number = 0;
  @ViewChild("asPannel") pannel: ElementRef | any;
  

  //constructor para habilitar renderer y poder añadir clases + usar servicio
  constructor(
    private renderer: Renderer2,
    private totalPresu: BudgetService
  ){}

  totalPresuValor:number = 0;
  ngOnInit():void{
    //nos suscribimos
    this.totalPresu.totalPresu$.subscribe(total => {
      this.totalPresuValor = total;  // Se actualiza el valor cuando cambia
    });
  };
  

  elegirServicio(value:number, event: Event):void{
    const checkbox2 = event.target as HTMLInputElement;

    //encontrar el box de ese checkbox cheqeuado
    const box = checkbox2.closest('.box');

    if(checkbox2.checked){
      this.sumaPresu += value;
      console.log("suma presupuesto chequeado: ", this.sumaPresu);
      this.totalPresu.sumameEstoAlPresu(value);

      console.log("id checkbox: ", checkbox2.id);

      //estilo box
      if(box)this.renderer.addClass(box, "active");
      else console.log("no veo el box");

      //visibility pannel
      if(checkbox2.id === "checkbox-web"){
        this.renderer.removeClass(this.pannel.nativeElement,"hidden");
        this.renderer.addClass(this.pannel.nativeElement,"visible");
      }

    } else{
      this.sumaPresu -=value;
      console.log("suma presupuesto: ", this.sumaPresu);
      // this.totalPresu = this.sumaPresu;
      this.totalPresu.restameEstoDelPresu(value);

      //estilo box
      if(box)this.renderer.removeClass(box, "active");
      else console.log("no veo el box");

      //visibility pannel
      if(checkbox2.id === "checkbox-web"){
        this.renderer.removeClass(this.pannel.nativeElement,"visible");
        this.renderer.addClass(this.pannel.nativeElement,"hidden");
      }
    }
  }
  

}
