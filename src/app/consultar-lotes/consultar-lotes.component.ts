import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { LoteService } from '../services/lote.service';
import { ProductoService } from '../services/producto.service';
import { EstadoService } from '../services/estado.service';
import { ProveedorLoteService } from '../services/proveedor-lote.services';
import { ProveedoresService } from '../services/proveedores.service';
import { Estado, Producto, Proveedor } from '../model/lote.model';



@Component({
  selector: 'app-consultar-lotes',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './consultar-lotes.component.html',
  styleUrl: './consultar-lotes.component.css'
})
export  default class ConsultarLotesComponent implements OnInit {

  data:any []=[];

  filtrar='';

  productos: Producto[] =[];
  proveedor: Proveedor[] =[];
  estados: Estado[] =[];
  
  infomostrar: any[]=[];

  constructor(private loteservice:LoteService,
    private productoservice: ProductoService,
    private proveedorservice:ProveedoresService,
    private estadoservice:EstadoService
  ){
    
    
  }
  
  ngOnInit() {
    this.llenardata();

    this.estadoservice.getEstado().subscribe((resul)=>{
      this.estados = resul;
      
    });
    this.productoservice.getProductos().subscribe((data)=>{
      this.productos = data;
    });
    this.proveedorservice.getProveedores().subscribe((data)=>{
      this.proveedor = data;
    });
  }

  llenardata(){
    this.loteservice.getLotes().subscribe(data =>{
      this.data =data;
      this.infomostrar = this.data;
      
    })
  }

  

  filter(event: any){
    this.loteservice.getLotes().subscribe((data)=>{
        this.infomostrar=this.data.filter((obj:any)=>{
          return obj.producto.toLocaleLowerCase().indexOf(event.toLocaleLowerCase()) > -1;
      });
    });
  }
}
