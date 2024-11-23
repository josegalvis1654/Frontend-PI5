import { Component, OnInit } from '@angular/core';
import {  RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NotificacionService } from '../services/notificacion.servise';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-main2',
  standalone: true,
  imports: [RouterOutlet ,RouterLink,CommonModule],
  templateUrl: './main2.component.html',
  styleUrl: './main2.component.css'
})
export  default class Main2Component implements OnInit {

  notificacion:any=[];
  noti:any[]=[];

  constructor(private notificaciones:NotificacionService){
    
  }
  ngOnInit(){
    this.notificaciones.obtenerCantidadTotalProductos().subscribe(data=>{
      this.notificacion=data;
      console.log(data);
    });
    this.notificaciones.obtenerLotesVencen().subscribe(data=>{
      this.noti=data;

    })
  }
}
