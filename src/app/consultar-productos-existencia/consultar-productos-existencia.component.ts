import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { ProductoService } from '../services/producto.service';
import { TipoService } from '../services/tipo.service';
import { UbicacionService } from '../services/ubicacion.service';
import { Tipo, Ubicacion } from '../model/lote.model';

@Component({
  selector: 'app-consultar-productos-existencia',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './consultar-productos-existencia.component.html',
  styleUrl: './consultar-productos-existencia.component.css'
})
export default class ConsultarProductosExistenciaComponent implements OnInit {

  data:any []=[];
  tipos: Tipo[]=[];
  ubicaciones: Ubicacion[]=[];

  filtrar='';
  
  infomostrar: any []=[];

  constructor(private productoservice:ProductoService,
    private tiposervice:TipoService,
    private ubicacionservice:UbicacionService
  ){
    
  }

  ngOnInit(): void {
    this.llenardata();

    this.tiposervice.getTipo().subscribe((data)=>{
      this.tipos =data;
    });
    this.ubicacionservice.getUbicacion().subscribe((data)=>{
      this.ubicaciones =data;

    });
  }

  llenardata(){
    this.productoservice.getProductos().subscribe(data =>{
      this.data =data;
      this.infomostrar = this.data;
    })
  }
  
  filter(event: any){
    this.infomostrar=this.data.filter(obj=>{
      return obj.columna1.toLocaleLowerCase().indexOf(event.toLocaleLowerCase()) > -1;
    });
  }

}
