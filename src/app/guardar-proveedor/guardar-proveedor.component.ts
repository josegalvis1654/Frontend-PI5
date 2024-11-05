import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Proveedor } from '../model/lote.model';
import { ProveedoresService } from '../services/proveedores.service';

@Component({
  selector: 'app-guardar-proveedor',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './guardar-proveedor.component.html',
  styleUrl: './guardar-proveedor.component.css'
})
export default class GuardarProveedorComponent implements OnInit {
  
  ProveedorForm: FormGroup = new FormGroup({});
  employeeObj: Proveedor = new Proveedor();
  employeeList: Proveedor[] = [];
  action: string;
  filtrar: string;
  infomostrar: any;

  constructor(private proveedoresService: ProveedoresService) {
    this.createForm();
    this.filtrar = '';
    this.action = "1";
  }
  filter(event: any){
    this.infomostrar=this.employeeList.filter((obj:any)=>{
      return obj.nit.toLocaleLowerCase().indexOf(event.toLocaleLowerCase()) > -1;
    });
  }
  ngOnInit() {
    this.cargarProveedores();
  }

  cargarProveedores() {
    this.proveedoresService.getProveedores().subscribe(
      (data: Proveedor[]) => {
        this.employeeList = data;
        this.infomostrar = this.employeeList;
      },
      (error) => {
        console.error('Error al cargar los proveedores:', error);
      }
    );
  }

  createForm() {
    this.ProveedorForm = new FormGroup({
      Id: new FormControl(this.employeeObj.id),
      nit: new FormControl(this.employeeObj.nit),
      razonSocial: new FormControl(this.employeeObj.razon_social),
      representanteLegal: new FormControl(this.employeeObj.representante_legal),
      direccion: new FormControl(this.employeeObj.direcion),
      telefono: new FormControl(this.employeeObj.telefono),
      vehiculoAsociado: new FormControl(this.employeeObj.vehiculo_asociado),
    });
  }

  Guardar() {
    this.proveedoresService.createProveedor(this.ProveedorForm.value).subscribe(
      (response) => {
        console.log('Proveedor creado con éxito:', response);
        this.employeeList.unshift(response);
        this.infomostrar = this.employeeList;
        this.employeeObj = new Proveedor();
        this.createForm();
      },
      (error) => {
        console.error('Error al crear el proveedor:', error);
      }
    );
  }

  Editar(item: Proveedor) {
    this.employeeObj = item;
    this.createForm();
    this.setAction("2");
  }

  setAction(action: string) {
    this.action = action;
  }

  Modificar() {
    const proveedorId = this.ProveedorForm.controls['Id'].value;
    this.proveedoresService.updateProveedor(proveedorId, this.ProveedorForm.value).subscribe(
      (response) => {
        console.log('Proveedor actualizado con éxito:', response);
        const index = this.employeeList.findIndex(m => m.id === proveedorId);
        if (index !== -1) {
          this.employeeList[index] = response;
        }
        this.infomostrar = this.employeeList;
        this.employeeObj = new Proveedor();
        this.createForm();
      },
      (error) => {
        console.error('Error al actualizar el proveedor:', error);
      }
    );
  }

  deleteInfo(event: any, columna1: string) {
    if (confirm("¿Deseas eliminar este dato?")) {
      const proveedorId = this.employeeList.find((p) => p.nit === columna1)?.id;
      if (proveedorId) {
        this.proveedoresService.deleteProveedor(proveedorId).subscribe(
          () => {
            this.employeeList = this.employeeList.filter((obj) => obj.nit !== columna1);
            this.infomostrar = this.employeeList;
            console.log('Proveedor eliminado con éxito');
          },
          (error) => {
            console.error('Error al eliminar el proveedor:', error);
          }
        );
      }
    }
  }
}
