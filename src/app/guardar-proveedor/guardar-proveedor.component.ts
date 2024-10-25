import { compileOpaqueAsyncClassMetadata } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormControl, FormGroup,  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Proveedor } from '../model/lote.model';

@Component({
  selector: 'app-guardar-proveedor',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './guardar-proveedor.component.html',
  styleUrl: './guardar-proveedor.component.css'
})
export default class GuardarProveedorComponent {
  
  ProveedorForm:FormGroup =new FormGroup({});

  employeeObj: Proveedor= new Proveedor();

  employeeList: Proveedor[] = [];

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
    this.ProveedorForm=new FormGroup({
      Id:new FormControl(this.employeeObj.Id),
      nit:new FormControl(this.employeeObj.nit),
      razonSocial:new FormControl(this.employeeObj.razonSocial),
      representanteLegal:new FormControl(this.employeeObj.representanteLegal),
      direccion:new FormControl(this.employeeObj.direccion),
      telefono:new FormControl(this.employeeObj.telefono),
      vehiculoAsociado:new FormControl(this.employeeObj.vehiculoAsociado),
    })
  }

  filter(event: any){
    this.infomostrar=this.employeeList.filter((obj:any)=>{
      return obj.nit.toLocaleLowerCase().indexOf(event.toLocaleLowerCase()) > -1;
    });
  }

  deleteInfo(event:any, columna1:string){
    if(confirm("Deseas eliminar este dato?"))
    {

      this.employeeList= this.employeeList.filter((obj:any)=>{
        return obj.nit != columna1;
      });
      this.infomostrar = this.employeeList;
    }
  }

  Guardar(){
    const oldData= localStorage.getItem("EmpData");
    if(oldData != null){
      const parseData= JSON.parse(oldData);
      this.ProveedorForm.controls['Id'].setValue(parseData.length +1);
      this.employeeList.unshift(this.ProveedorForm.value);
    }
    else{
      this.employeeList.unshift(this.ProveedorForm.value);
    }
    localStorage.setItem('EmpData',JSON.stringify(this.employeeList))
    this.employeeObj = new Proveedor();
    this.infomostrar = this.employeeList;
    this.createForm()
  }

  Editar(item:Proveedor){
    this.employeeObj =item;
    this.createForm();
    this.setAction("2");
  }

  setAction(action: string){
    this.action = action;
  }
  
  Modificar(){
    const record = this.employeeList.find(m=>m.Id == this.ProveedorForm.controls['Id'].value);
    if(record != undefined){
      record.nit = this.ProveedorForm.controls['nit'].value;
      record.razonSocial = this.ProveedorForm.controls['razonSocial'].value;
      record.representanteLegal = this.ProveedorForm.controls['representanteLegal'].value;
      record.direccion = this.ProveedorForm.controls['direccion'].value;
      record.telefono = this.ProveedorForm.controls['telefono'].value;
      record.vehiculoAsociado = this.ProveedorForm.controls['vehiculoAsociado'].value;
    }
    localStorage.setItem('EmpData',JSON.stringify(this.employeeList));
    this.employeeObj = new Proveedor();
    this.createForm();
  }

}
