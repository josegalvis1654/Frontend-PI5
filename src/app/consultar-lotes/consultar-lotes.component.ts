import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { LoteService } from '../services/lote.service';



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
  
  infomostrar: any[]=[];

  constructor(private loteservice:LoteService){
    
    
  }
  
  ngOnInit(): void {
    this.llenardata();
  }

  llenardata(){
    this.loteservice.getLotes().subscribe(data =>{
      this.data =data;
      this.infomostrar = this.data;
      console.log(this.data);
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
