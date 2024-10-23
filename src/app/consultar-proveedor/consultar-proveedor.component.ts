import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-consultar-proveedor',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './consultar-proveedor.component.html',
  styleUrl: './consultar-proveedor.component.css'
})
export default class ConsultarProveedorComponent {

  filtrar='';
  info=[{"columna1":"Airi Satou","columna2":"Accountant","columna3":"Tokyo","columna4":"33","columna5":"2008/11/28","columna6":"$162,700","columna7":"$162,700"},
    {"columna1":"pepito","columna2":"Accountant","columna3":"Tokyo","columna4":"33","columna5":"2008/11/28","columna6":"$162,700","columna7":"$162,700"}
  ];
  infomostrar: any;
  constructor(){
    this.infomostrar = this.info;
  }
  
  filter(event: any){
    this.infomostrar=this.info.filter(obj=>{
      return obj.columna1.toLocaleLowerCase().indexOf(event.toLocaleLowerCase()) > -1;
    });
  }

}
