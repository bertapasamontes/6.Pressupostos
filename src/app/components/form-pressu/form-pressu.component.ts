import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators} from '@angular/forms';
import { BudgetService } from '../../services/budget.service';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-form-pressu',
  imports: [ReactiveFormsModule, NgStyle],
  templateUrl: './form-pressu.component.html',
  styleUrl: './form-pressu.component.scss'
})
export class FormPressuComponent {
[x: string]: any;
  constructor(
    private totalPresu: BudgetService,
    private renderer: Renderer2
  ){}

  //styles
  classResultPresu = {
    'display': 'none' 
  }

  totalPresuValor:number = 0;

  //varaibles del output
  @ViewChild("asResultPresu") resultPresu!: ElementRef; // ! = confia que se usará cuando esté inicializado

  @ViewChild("asUsernameOutput") usernameOutput: ElementRef | any;
  @ViewChild("asEmailOutput") emailOutput: ElementRef | any;
  @ViewChild("asPhoneOutput") phoneOutput: ElementRef | any;
  
  

 
  // formPressu = new FormGroup({
  //   username : new FormControl(''),
  //   phoneNumber:new FormControl(0),
  //   email:new FormControl('')
  // });


  //creamos el formPresu
  public formPressu: FormGroup = new FormGroup({});

  ngOnInit():void{
    //suscripción al total
    this.totalPresu.totalPresu$.subscribe(total => {
      this.totalPresuValor = total;  // se actualiza el valor cuando cambia
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

        // alert("enviado exitosamente");
        this.getInfo();


      } else {
        console.log('El formulario no es válido');
        alert("Por favor, rellena los campos");
      }
    }
  }

  
  getInfo(){
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
}
