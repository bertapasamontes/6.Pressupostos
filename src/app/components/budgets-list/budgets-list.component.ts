import { Component, ElementRef, OnInit, ViewChild, Renderer2, Pipe} from '@angular/core';
import { PanelComponent } from "../panel/panel.component";
import { BudgetService } from '../../services/budget.service';
import { ReactiveFormsModule, FormControl, FormGroup, Validators} from '@angular/forms';
import { CommonModule, NgFor, NgForOf, NgStyle } from '@angular/common';
import { Pressu } from '../../pressu';

@Component({
  selector: 'app-budgets-list',
  imports: [PanelComponent,ReactiveFormsModule, NgStyle, CommonModule],
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

  public serviciosAñadidos:[] | any = [];

  presupuestos: [] | any= [];

  //styles
  classResultPresu = {
    'display': 'none' 
  }
   
  sumaPresu:number = 0;
  @ViewChild("asPannel") pannel: ElementRef | any;

  //varaibles del output
  @ViewChild("asResultPresu") resultPresu!: ElementRef; // ! = confia que se usará cuando esté inicializado

  @ViewChild("asUsernameOutput") usernameOutput: ElementRef | any;
  @ViewChild("asEmailOutput") emailOutput: ElementRef | any;
  @ViewChild("asPhoneOutput") phoneOutput: ElementRef | any;

  @ViewChild("asButtonDate") buttonDate: ElementRef | any;
  @ViewChild("asButtonPrice") buttonPrice: ElementRef | any;
  @ViewChild("asButtonName") buttonName: ElementRef | any;

  

  //constructor para habilitar renderer y poder añadir clases + usar servicio
  constructor(
    private renderer: Renderer2,
    private totalPresu: BudgetService,
    private costesAdicionales: BudgetService,
    private budgetService: BudgetService
  ){}
  coste:number = 0;
  totalPresuValor:number = 0;

  //creamos el formPresu
  public formPressu: FormGroup = new FormGroup({});
  

  ngAfterViewInit() {
    if (this.pannel) {
      console.log('numPages del panel:', this.pannel.numPages);
      console.log('numPages del panel:', this.pannel.numLanguajes);
    } else {
      console.error('PanelComponent no está inicializado');
    }
  }
  numPagesValor: number = 0;
  numLanguajesValor: number = 0;

  ngOnInit():void{
    //nos suscribimos
    this.totalPresu.totalPresu$.subscribe(total => {
      this.totalPresuValor = total;  // Se actualiza el valor cuando cambia
    });

    this.costesAdicionales.costeAdicional$.subscribe(total => {
      this.coste = total;  // Se actualiza el valor cuando cambia
    });

     // nos suscribimos a los cambios de numPages$ para que se actualicen dinamicamente
    this.budgetService.numPages$.subscribe(pages => {
      this.numPagesValor = pages;
      // se actualizan los servicios añadidos relacionados con Web
      this.serviciosAñadidos.forEach((servicio: any) => {
        if (servicio.id === 'Web') {
          servicio.numberOfPages = pages; // se actualiza dinámicamente
        }
      });
    });

    // nos suscribimos a los cambios de numLanguajes$
    this.budgetService.numLanguajes$.subscribe(languajes => {
      this.numLanguajesValor = languajes;
      // se actualizan dinámicamente los servicios añadidos relacionados con Web
      this.serviciosAñadidos.forEach((servicio: any) => {
        if (servicio.id === 'Web') {
          servicio.numberOfLanguajes = languajes; // se actualiza dinámicamente
        }
      });
    });


    //creamos la estructura del form y recogemos sus variables
    this.formPressu = new FormGroup(
      {
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phoneNumber:new FormControl(0, [Validators.required])
      }
    );
  };

  onPagesChanged(newNumPages: number): void {
    console.log('Número de páginas actualizado en el padre:', newNumPages);
    this.numPagesValor = newNumPages;
    // Puedes almacenar este valor si necesitas usarlo en otro lugar
  }
  
  onLanguajesChanged(newNumLanguajes: number): void {
    console.log('Número de idiomas actualizado en el padre:', newNumLanguajes);
    this.numLanguajesValor = newNumLanguajes; 
    // Almacenar este valor si es necesario
  }

  private updatePanelInputs() {
    // Utiliza el Renderer2 para actualizar los valores de los inputs del panel directamente
    this.renderer.setProperty(document.querySelector('#numPagesInput'), 'value', this.budgetService.getNumPages().toString());
    this.renderer.setProperty(document.querySelector('#numLanguajesInput'), 'value', this.budgetService.getNumLanguajes().toString());
  }
  

  elegirServicio(value:number, event: Event):void{
    const checkbox = event.target as HTMLInputElement;

    //encontrar el box de ese checkbox chequeado
    const box = checkbox.closest('.box');

    if(checkbox.checked){
      this.sumaPresu += value;
      console.log("suma presupuesto chequeado: ", this.sumaPresu);
      this.totalPresu.sumameEstoAlPresu(value);

      console.log("id checkbox: ", checkbox.id);

     

      //estilo box
      if(box)this.renderer.addClass(box, "active");
      else console.log("no veo el box");

      //visibility pannel
      if(checkbox.id === "Web"){
        this.renderer.removeClass(this.pannel.nativeElement,"hidden");
        this.renderer.addClass(this.pannel.nativeElement,"visible");

        // const numPages = this.pannel?.numPages; // Número de páginas desde el componente hijo
        // const numLanguajes = this.pannel?.numLanguajes;

        const currentPages = this.budgetService.getNumPages();
        console.log("current pages: ", currentPages)
        const currentLanguajes = this.budgetService.getNumLanguajes();

        //añadimos el serivicio seeccionado al array serviciosAñadidos
        this.serviciosAñadidos.push({
          id : checkbox.id,
          value: checkbox.value,
          numberOfPages: currentPages,
          numberOfLanguajes: currentLanguajes
        });
        console.log("servicio añadido: ", this.serviciosAñadidos);
      }
      else{
        //añadimos el serivicio seeccionado al array serviciosAñadidos
        this.serviciosAñadidos.push({
          id : checkbox.id,
          value: checkbox.value,
        });
        console.log("servicio añadido: ", this.serviciosAñadidos);
      }

    } else{
      this.sumaPresu -=value;
      console.log("suma presupuesto: ", this.sumaPresu);
      this.totalPresu.restameEstoDelPresu(value);

      //quitamos el elemento del array serviciosAñadidos
      let indexCheckId = this.serviciosAñadidos.indexOf(checkbox.id);
      this.serviciosAñadidos.splice(indexCheckId, 1);
      
      console.log("servicio eliminado: ", this.serviciosAñadidos);


      //visibility pannel
      if(checkbox.id === "Web"){
        this.coste = 0;
        
        // this.numPagesValor = 1; // valores predeterminados
        // this.numLanguajesValor = 0;
        this.renderer.removeClass(this.pannel.nativeElement,"visible");
        this.renderer.addClass(this.pannel.nativeElement,"hidden");
      }
      //estilo box
      if(box)this.renderer.removeClass(box, "active");
      else console.log("no veo el box");
    }
  }
  
  

  showPresu() {
    //suscripción al total
    this.totalPresu.totalPresu$.subscribe(total => {
      this.totalPresuValor = total;  // se actualiza el valor cuando cambia
    });

    //miramos si está vacío el total
    if(this.totalPresuValor <= 0){
      alert("Por favor, añade algun servicio");
    } else{ 
      //si el total no está vacío:
      if (this.formPressu.valid) {
        console.log('El formulario es válido:', this.formPressu.value); //impirme el contenido del form

        //cambiamos estilos en el resultado del form para que se muestre
        this.classResultPresu = {
          'display': 'block'
        }

        this.getInfo();


      } else {
        console.log('El formulario no es válido');
        alert("Por favor, rellena los campos");
      }
    }
  }

  showInfo(){
    //cogemos las variables del form
    const username = this.renderer.createElement('p');
    username.innerText = this.formPressu.get('username')?.value;
    this.renderer.addClass(username, 'username-style'); //style para que aparezca más grande y en bold

    const email = this.renderer.createElement('p');
    email.innerText = this.formPressu.get('email')?.value;

    const phone = this.renderer.createElement('p');
    phone.innerText = this.formPressu.get('phoneNumber')?.value;

    //row
    const row = this.renderer.createElement('div');
    this.renderer.addClass(row, 'row');
    this.renderer.addClass(row, 'box');

    //atributo del row
    this.renderer.setAttribute(row, "data-username", this.formPressu.get('username')?.value.toLowerCase().replace(/ /g, "-"));
    this.renderer.setAttribute(row, "data-price", this.totalPresuValor.toString());
    this.renderer.setAttribute(row, "data-date", Date());

    // columnas dentro del row
    const col1 = this.renderer.createElement('div');
    const col2 = this.renderer.createElement('div');
    const col3 = this.renderer.createElement('div');

    this.renderer.addClass(col1, 'col');
    this.renderer.addClass(col2, 'col');
    this.renderer.addClass(col3, 'col');



    //----  contenido dentro de las columnas --------
    //col1
    this.renderer.appendChild(col1, username);
    this.renderer.appendChild(col1, email);
    this.renderer.appendChild(col1, phone);

    //col2
    const col2Text = this.renderer.createElement('p');
    col2Text.innerText = "Serveis contractats:";
    this.renderer.addClass(col2Text, 'title-col2');
    this.renderer.appendChild(col2, col2Text);

    //imprimimos los servicios marcados
    this.serviciosAñadidos.forEach((servicio: any) => {
      const linea = this.renderer.createElement('li');
      if (servicio.id === 'Web') {
        linea.innerText = `${servicio.id} (${servicio.numberOfPages} pàgines i ${servicio.numberOfLanguajes} llenguatges)`;
      } else {
        linea.innerText = servicio.id;
      }
      this.renderer.appendChild(col2, linea);
    });


    //col3
    const col3Text = this.renderer.createElement('p');
    col3Text.innerText = "Total:";
    this.renderer.appendChild(col3, col3Text);

    const col3Total = this.renderer.createElement('p');
    col3Total.innerText = this.totalPresuValor+'€';
    this.renderer.appendChild(col3, col3Total);
    //----  fin contenido dentro de las columnas -----------



    //añadimos las columnas a la row
    this.renderer.appendChild(row, col1);
    this.renderer.appendChild(row, col2);
    this.renderer.appendChild(row, col3);

    //añadimos la row a resultPresu
    this.renderer.appendChild(this.resultPresu.nativeElement, row);
  }

  
  getInfo(){
    this.presupuestos.push({
      nombre:this.formPressu.get('username')?.value,
      fecha:Date(),
      precio:this.totalPresuValor
    });
    console.log("presupuestos", this.presupuestos);

    this.showInfo();
    this.cleanForm();
  }

  cleanForm(){
    //limpiamos chequeadores
    // Desmarcar todos los checkboxes
    const checkboxes = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      checkbox.checked = false; // Desmarcar el checkbox
      const box = checkbox.closest('.box');
      this.renderer.removeClass(box, "active");
    });

    // Reiniciar el formulario
    // this.formPressu.reset();
    this.serviciosAñadidos=[];
    this.totalPresu .resetPresu();
    //encontrar el box de ese checkbox chequeado
      
    this.budgetService.resetPagesAndLanguajes();

    // actualizar inputs del panel
    this.updatePanelInputs();

    this.renderer.removeClass(this.pannel.nativeElement,"visible");
    this.renderer.addClass(this.pannel.nativeElement,"hidden");
  }  


  //NO VA LO DE LAS CLASES DE ACTIVE!!!!!
  orderByName(){ //ordenar divs alfabeticamente
    // this.renderer.addClass(this.buttonName, 'active');
    // this.renderer.removeClass(this.buttonPrice, 'active');
    // this.renderer.removeClass(this.buttonDate, 'active');


    // ordenar los divs después de añadir uno nuevo
    const rows = Array.from(this.resultPresu.nativeElement.children);
    rows.sort((a: any, b: any) => {
      const usernameA = a.getAttribute('data-username') || '';
      const usernameB = b.getAttribute('data-username') || '';
      return usernameA.localeCompare(usernameB); // orden alfabético
    });

    rows.forEach(row => this.resultPresu.nativeElement.appendChild(row));
  }

  orderByPrice(){
    // this.renderer.removeClass(this.buttonName, 'active');
    // this.renderer.addClass(this.buttonPrice, 'active');
    // this.renderer.removeClass(this.buttonDate, 'active');

    const rows = Array.from(this.resultPresu.nativeElement.children);
    rows.sort((a: any, b: any) => {
      const priceA = a.getAttribute('data-price') || '';
      const priceB = b.getAttribute('data-price') || '';
      return priceA.localeCompare(priceB); // orden por precio (alfabeticamente?)
    });

    rows.forEach(row => this.resultPresu.nativeElement.appendChild(row));
  }

  orderByDate(){
    // this.renderer.removeClass(this.buttonName, 'active');
    // this.renderer.removeClass(this.buttonPrice, 'active');
    // this.renderer.addClass(this.buttonDate, 'active');

    const rows = Array.from(this.resultPresu.nativeElement.children);
    rows.sort((a: any, b: any) => {
      const dateA = a.getAttribute('data-date') || '';
      const dateB = b.getAttribute('data-date') || '';
      return dateA.localeCompare(dateB); // orden por precio (alfabeticamente?)
    });

    rows.forEach(row => this.resultPresu.nativeElement.appendChild(row));
  }
}
