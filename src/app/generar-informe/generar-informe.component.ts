
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js'; // Importa Chart.js y registra los elementos necesarios


Chart.register(...registerables); // Registra todos los elementos de Chart.js (como ejes, leyendas, etc.)

@Component({
  selector: 'app-generar-informe',
  standalone: true,
  imports: [],
  templateUrl: './generar-informe.component.html',
  styleUrl: './generar-informe.component.css'
})
export default class GenerarInformeComponent implements OnInit {

  

  //@ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>; // Referencia al canvas

  constructor(){
    //this.canvas
    }

  ngOnInit(): void {
    this.crearGrafico();
  }

  crearGrafico(): void {
    
    //const ctx = this.canvas.nativeElement.getContext('2d'); // Obtiene el contexto del canvas
    const ctx = document.getElementById('myChart');
    new Chart("ctx", {
      type: 'bar', // Tipo de gráfico (puede ser 'line', 'bar', etc.)
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'], // Etiquetas para el eje X
        datasets: [{
          label: 'Ventas',
          data: [10, 20, 30, 40, 50], // Datos a mostrar en el gráfico
          backgroundColor: 'rgba(255, 99, 132, 0.2)', // Color de fondo de las barras
          borderColor: 'rgba(255, 99, 132, 1)', // Color del borde de las barras
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
