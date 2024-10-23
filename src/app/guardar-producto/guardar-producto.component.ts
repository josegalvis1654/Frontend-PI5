import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-guardar-producto',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './guardar-producto.component.html',
  styleUrl: './guardar-producto.component.css'
})
export default class GuardarProductoComponent {

  filtrar='';
  info=[{"columna1":"Airi Satou","columna2":"Accountant","columna3":"Tokyo","columna4":"33","columna5":"2008/11/28"},
    {"columna1":"Angelica Ramos","columna2":"Chief","columna3":"Tokyo","columna4":"47","columna5":"2009/10/09"},
    {"columna1":"4","columna2":"Manzana","columna3":"Fruta","columna4":"5","columna5":"2009/10/09"}
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

  deleteInfo(event:any, columna1:string){
    if(confirm("Deseas eliminar este dato?"))
    {
      event.target.innerText= "Eliminando..";

      this.info= this.info.filter(obj=>{
        return obj.columna1 != columna1;
      });
      this.infomostrar = this.info;
    }
  }

}
