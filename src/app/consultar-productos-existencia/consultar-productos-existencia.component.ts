import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-consultar-productos-existencia',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './consultar-productos-existencia.component.html',
  styleUrl: './consultar-productos-existencia.component.css'
})
export default class ConsultarProductosExistenciaComponent {

  filtrar='';
  info=[{"columna1":"Airi Satou","columna2":"Accountant","columna3":"Tokyo","columna5":"2008/11/28"},
    {"columna1":"Angelica Ramos","columna2":"Chief","columna3":"Tokyo","columna5":"2009/10/09"},
    {"columna1":"4","columna2":"Manzana","columna3":"Fruta","columna5":"2009/10/09"}
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
