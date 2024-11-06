import { compileOpaqueAsyncClassMetadata } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Lote } from '../model/lote.model';

@Component({
  selector: 'app-guardar-lote',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './guardar-lote.component.html',
  styleUrl: './guardar-lote.component.css'
})
export default class GuardarLoteComponent {

  loteForm:FormGroup =new FormGroup({});

  employeeObj: Lote= new Lote();

  employeeList: Lote[] = [];

  action: string;

  filtrar:string;
  infomostrar: any;
  constructor(){
    this.createForm();
    
    const oldData= localStorage.getItem("EmpData");
    if(oldData != null){
      const parseData= JSON.parse(oldData);
      this.employeeList = parseData;
      
    }
    this.filtrar='';
    this.action = "1";
    this.infomostrar = this.employeeList;
  }

  
  createForm(){
    this.loteForm=new FormGroup({
      id:new FormControl(this.employeeObj.id),
      producto:new FormControl(this.employeeObj.producto),
      fechaentrega:new FormControl(this.employeeObj.fechaentrega),
      estado:new FormControl(this.employeeObj.estado),
      cantidad:new FormControl(this.employeeObj.cantidad),
      fechacaducidad:new FormControl(this.employeeObj.fechacaducidad),
      
    })
  }

  filter(event: any){
    this.infomostrar=this.employeeList.filter((obj:any)=>{
      return obj.producto.toLocaleLowerCase().indexOf(event.toLocaleLowerCase()) > -1;
    });
  }

  deleteInfo(event:any, columna1:string){
    if(confirm("Deseas eliminar este dato?"))
    {

      this.employeeList= this.employeeList.filter((obj:any)=>{
        return obj.producto != columna1;
      });
      this.infomostrar = this.employeeList;
    }
  }

  Guardar(){
    const oldData= localStorage.getItem("EmpData");
    if(oldData != null){
      const parseData= JSON.parse(oldData);
      this.loteForm.controls['id'].setValue(parseData.length +1);
      this.employeeList.unshift(this.loteForm.value);
    }
    else{
      this.employeeList.unshift(this.loteForm.value);
    }
    localStorage.setItem('EmpData',JSON.stringify(this.employeeList))
    this.employeeObj = new Lote();
    this.infomostrar = this.employeeList;
    this.createForm()
  }

  Editar(item:Lote){
    this.employeeObj =item;
    this.createForm();
    this.setAction("2");
  }

  setAction(action: string){
    this.action = action;
  }
  
  Modificar(){
    const record = this.employeeList.find(m=>m.id == this.loteForm.controls['id'].value);
    if(record != undefined){
      record.producto = this.loteForm.controls['producto'].value;
      record.fechaentrega = this.loteForm.controls['fechaentrega'].value;
      record.estado = this.loteForm.controls['estado'].value;
      record.cantidad = this.loteForm.controls['cantidad'].value;
      record.fechacaducidad = this.loteForm.controls['fechacaducidad'].value;
    }
    localStorage.setItem('EmpData',JSON.stringify(this.employeeList));
    this.employeeObj = new Lote();
    this.createForm();
  }

}
