import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Producto } from '../model/lote.model';

@Component({
  selector: 'app-guardar-producto',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './guardar-producto.component.html',
  styleUrl: './guardar-producto.component.css'
})
export default class GuardarProductoComponent {


  ProductoForm:FormGroup =new FormGroup({});

  employeeObj: Producto= new Producto();

  employeeList: Producto[] = [];

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
    this.ProductoForm=new FormGroup({
      Id:new FormControl(this.employeeObj.Id),
      nombre:new FormControl(this.employeeObj.nombre),
      tipo:new FormControl(this.employeeObj.tipo),
      ubicacion:new FormControl(this.employeeObj.ubicacion),
    })
  }

  filter(event: any){
    this.infomostrar=this.employeeList.filter((obj:any)=>{
      return obj.nombre.toLocaleLowerCase().indexOf(event.toLocaleLowerCase()) > -1;
    });
  }

  deleteInfo(event:any, columna1:string){
    if(confirm("Deseas eliminar este dato?"))
    {

      this.employeeList= this.employeeList.filter((obj:any)=>{
        return obj.nombre != columna1;
      });
      this.infomostrar = this.employeeList;
    }
  }

  Guardar(){
    const oldData= localStorage.getItem("EmpData");
    if(oldData != null){
      const parseData= JSON.parse(oldData);
      this.ProductoForm.controls['Id'].setValue(parseData.length +1);
      this.employeeList.unshift(this.ProductoForm.value);
    }
    else{
      this.employeeList.unshift(this.ProductoForm.value);
    }
    localStorage.setItem('EmpData',JSON.stringify(this.employeeList))
    this.employeeObj = new Producto();
    this.infomostrar = this.employeeList;
    this.createForm()
  }

  Editar(item:Producto){
    this.employeeObj =item;
    this.createForm();
    this.setAction("2");
  }

  setAction(action: string){
    this.action = action;
  }
  
  Modificar(){
    const record = this.employeeList.find(m=>m.Id == this.ProductoForm.controls['id'].value);
    if(record != undefined){
      record.Id = this.ProductoForm.controls['Id'].value;
      record.nombre = this.ProductoForm.controls['nombre'].value;
      record.tipo = this.ProductoForm.controls['tipo'].value;
      record.ubicacion = this.ProductoForm.controls['ubicacion'].value;
    }
    localStorage.setItem('EmpData',JSON.stringify(this.employeeList));
    this.employeeObj = new Producto();
    this.createForm();
  }


}
