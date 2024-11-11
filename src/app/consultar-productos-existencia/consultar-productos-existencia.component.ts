import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-consultar-productos-existencia',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './consultar-productos-existencia.component.html',
  styleUrl: './consultar-productos-existencia.component.css'
})
export default class ConsultarProductosExistenciaComponent implements OnInit {

  data:any []=[];


  filtrar='';
  
  infomostrar: any []=[];

  constructor(private productoservice:ProductoService){
    
  }

  ngOnInit(): void {
    this.llenardata();
  }

  llenardata(){
    this.productoservice.getProductos().subscribe(data =>{
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
