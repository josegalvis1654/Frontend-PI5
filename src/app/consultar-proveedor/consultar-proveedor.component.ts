import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Proveedor } from '../model/lote.model';
import { ProveedoresService } from '../services/proveedores.service';

@Component({
  selector: 'app-consultar-proveedor',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './consultar-proveedor.component.html',
  styleUrl: './consultar-proveedor.component.css'
})
export default class ConsultarProveedorComponent implements OnInit{

  data:any []=[];

  filtrar='';
  
  infomostrar: any[]=[];

  constructor(private proveedorservice:ProveedoresService){
  
  }

  ngOnInit(): void {
    this.llenardata();
  }

  llenardata(){
    this.proveedorservice.getProveedores().subscribe(data =>{
      this.data =data;
      this.infomostrar = this.data;
      console.log(this.data);
    })
  }
  
  filter(event: any){
    this.infomostrar=this.data.filter(obj=>{
      return obj.columna1.toLocaleLowerCase().indexOf(event.toLocaleLowerCase()) > -1;
    });
  }

}
