
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js'; // Importa Chart.js y registra los elementos necesarios
import { ProductoLoteService } from '../services/producto-lote.service';
import { UbicacionProductoService } from '../services/ubicacion-producto.service';
import { ProveedorLoteService } from '../services/proveedor-lote.services';
import { CantidadTotalService } from '../services/cantidad-total.service';
import { CaducarLoteService } from '../services/caducar-lote.service';
import { RecienteLoteService } from '../services/reciente-lote.service';
import { CommonModule } from '@angular/common';


Chart.register(...registerables); // Registra todos los elementos de Chart.js (como ejes, leyendas, etc.)

@Component({
  selector: 'app-generar-informe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './generar-informe.component.html',
  styleUrl: './generar-informe.component.css'
})
export default class GenerarInformeComponent implements OnInit {
  productoubicacion:any={};
  caducadolote:any[]=[];
  
  loteproveedor:any={};
  
  loteproducto:any={};// producto con mas lotes
  
  lotereciente:any={}; //lote mas reciente

  totalproducto: any[]=[];
  producto: any[]=[];
  chardata:any;

  constructor(private productolote:ProductoLoteService,
    private ubicacionproducto:UbicacionProductoService,
    private proveedorlote:ProveedorLoteService,
    private caducarlote:CaducarLoteService,
    private cantidadtotal:CantidadTotalService,
    private recientelote:RecienteLoteService
  ){
    //this.canvas
    }

  ngOnInit(): void {
    this.productolote.obtenerProductoConMasLotes().subscribe(data=>{
      this.loteproducto=data['producto_mas_lotes'];
    });

    this.ubicacionproducto.obtenerUbicacionConMasProductos().subscribe(data=>{
      this.productoubicacion=data['ubicaciones_mas_productos'];
      
    });

    this.proveedorlote.obtenerProveedorConMasLotes().subscribe(data=>{
      this.loteproveedor=data['proveedores'];
      
    });

    this.caducarlote.obtenerLotesProximosACaducar().subscribe(data=>{
      this.caducadolote=data;
      
    })

    this.cantidadtotal.obtenerTotalCantidadPorProducto().subscribe(result=>{
      this.chardata=result;
      if(this.chardata!=null){
        for(let i=0; i<this.chardata.length; i++){
          this.totalproducto.push(this.chardata[i].total_cantidad);
          this.producto.push(this.chardata[i].producto__nombre);
        }
        this.crearGrafico(this.totalproducto,this.producto);
      }
    });

    this.recientelote.obtenerLotesRecientes().subscribe(data=>{
      this.lotereciente=data;
      //console.log("lote reciente",this.lotereciente);
    });
  }


  crearGrafico(totalproducto:any,producto:any) {
    
    //const ctx = this.canvas.nativeElement.getContext('2d'); // Obtiene el contexto del canvas
    const ctx = //document.getElementById('myChart');
    new Chart("ctx", {
      type: 'bar', // Tipo de gráfico (puede ser 'line', 'bar', etc.)
      data: {
        labels: producto, // Etiquetas para el eje X
        datasets: [{
          label: 'Cantidad',
          data: totalproducto, // Datos a mostrar en el gráfico
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ], // Color de fondo de las barras
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ], // Color del borde de las barras
          borderWidth: 1 // Ancho del borde
        }]
      },
      options: {
        responsive: true, // Hace el gráfico responsive
        scales: {
          y: {
            beginAtZero: true // Hace que el eje Y comience desde cero
          }
        }
      }
    });
  }
}
