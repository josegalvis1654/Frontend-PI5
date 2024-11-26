import { Component } from '@angular/core';
import { NotificacionService } from '../services/notificacion.servise';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet,RouterLink,CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export default class MainComponent {

  notificacion:any=[];
  noti:any[]=[];

  constructor(private notificaciones:NotificacionService){
    
  }
  ngOnInit(){
    this.notificaciones.obtenerCantidadTotalProductos().subscribe(data=>{
      this.notificacion=data['productos'];
      console.log(data);
    });
    this.notificaciones.obtenerLotesVencen().subscribe(data=>{
      this.noti=data;

    })
  }
}