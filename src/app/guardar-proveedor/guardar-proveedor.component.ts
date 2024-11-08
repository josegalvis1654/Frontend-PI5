import { compileOpaqueAsyncClassMetadata } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Proveedor } from '../model/lote.model';
import { ProveedoresService } from '../services/proveedores.service';

@Component({
  selector: 'app-guardar-proveedor',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './guardar-proveedor.component.html',
  styleUrl: './guardar-proveedor.component.css'
})
export default class GuardarProveedorComponent implements OnInit {
  
  ProveedorForm:FormGroup =new FormGroup({});

  employeeObj: Proveedor= new Proveedor();

  employeeList: Proveedor[] = [];

  action: string;

  filtrar:string;
  infomostrar: any;
  constructor(private proveedorservice:ProveedoresService){
    this.createForm();
    
    this.filtrar='';
    this.action = "1";
    this.infomostrar = this.employeeList;
  }

  ngOnInit(){
    this.proveedorservice.getProveedores().subscribe((data)=>{
      this.employeeList = data;
      this.infomostrar =data;
    });
  }

  
  createForm(){
    this.ProveedorForm=new FormGroup({
      id:new FormControl(this.employeeObj.id),
      nit:new FormControl(this.employeeObj.nit),
      razon_social:new FormControl(this.employeeObj.razon_social),
      representante_legal:new FormControl(this.employeeObj.representante_legal),
      direcion:new FormControl(this.employeeObj.direcion),
      telefono:new FormControl(this.employeeObj.telefono),
      vehiculo_asociado:new FormControl(this.employeeObj.vehiculo_asociado),
    })
  }

  filter(event: any){
    this.proveedorservice.getProveedores().subscribe((data)=>{  
      this.infomostrar=this.employeeList.filter((obj:any)=>{
        return obj.nit.toLocaleLowerCase().indexOf(event.toLocaleLowerCase()) > -1;
      });
    });
  }

  deleteInfo(event:any, id:any){
    if(confirm("Deseas eliminar este dato?"))
    {
      this.proveedorservice.deleteProveedor(id).subscribe(()=>{
        this.employeeList= this.employeeList.filter((obj:any)=>{
          return obj.id != id;
        });
      })
      this.infomostrar = this.employeeList;
      this.ngOnInit();
    }
  }

  Guardar() {
    this.proveedorservice.createProveedor(this.ProveedorForm.value).subscribe({
        next: (response:any) => {
            // Agregar el nuevo lote a la lista local con los datos de la respuesta
            this.employeeList.unshift(response.proveedor);
            this.employeeObj = new Proveedor(); // Reiniciar el formulario
            this.infomostrar = this.employeeList; // Actualizar la vista
            console.log(this.infomostrar)
            this.createForm(); // Reiniciar el formulario para futuras entradas
        },
        error: (err) => {
            console.error('Error al guardar el lote:', err);
        }
    });
  }

  Editar(item:Proveedor){
    this.employeeObj =item;
    this.createForm();
    this.setAction("2");
  }

  setAction(action: string){
    this.action = action;
  }
  
  

  Modificar() {
    const updatedData = {
      id: this.ProveedorForm.controls['id'].value,
      nit : this.ProveedorForm.controls['nit'].value,
      razon_social : this.ProveedorForm.controls['razon_social'].value,
      representante_legal : this.ProveedorForm.controls['representante_legal'].value,
      direcion : this.ProveedorForm.controls['direcion'].value,
      telefono : this.ProveedorForm.controls['telefono'].value,
      vehiculo_asociado : this.ProveedorForm.controls['vehiculo_asociado'].value,
    };

    this.proveedorservice.updateProveedor(updatedData.id, updatedData).subscribe({
        next: (response) => {
            // Actualizar el registro en la lista local después de una respuesta exitosa
            const record = this.employeeList.find(m => m.id === updatedData.id);
            if (record) {
                Object.assign(record, response);
                this.ngOnInit(); // Actualiza el objeto con los datos devueltos por el servidor
            }
            this.employeeObj = new Proveedor();
            this.createForm(); // Reinicia el formulario
        },
        error: (err) => {
            console.error('Error al modificar el lote:', err);
        }
    });
  }

}
