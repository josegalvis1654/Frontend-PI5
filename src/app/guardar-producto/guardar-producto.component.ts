import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Producto } from '../model/lote.model';
import { ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-guardar-producto',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './guardar-producto.component.html',
  styleUrl: './guardar-producto.component.css'
})
export default class GuardarProductoComponent implements OnInit {


  ProductoForm:FormGroup =new FormGroup({});

  employeeObj: Producto= new Producto();

  employeeList: Producto[] = [];

  action: string;

  filtrar:string;
  infomostrar: any;
  constructor(private productoservice:ProductoService){
    this.createForm();
    
    
    this.filtrar='';
    this.action = "1";
    this.infomostrar = this.employeeList;
  }

  
  createForm(){
    this.ProductoForm=new FormGroup({
      id:new FormControl(this.employeeObj.id),
      nombre:new FormControl(this.employeeObj.nombre),
      tipo:new FormControl(this.employeeObj.tipo),
      ubicacion:new FormControl(this.employeeObj.ubicacion),
    })
  }

  ngOnInit(){
    this.productoservice.getProductos().subscribe((data)=>{
      this.employeeList = data;
      this.infomostrar =data;
    });
  }

  filter(event: any){
    this.productoservice.getProductos().subscribe((data)=>{
      this.infomostrar=this.employeeList.filter((obj:any)=>{
        return obj.nombre.toLocaleLowerCase().indexOf(event.toLocaleLowerCase()) > -1;
    });
  });
  }

  deleteInfo(event:any, id:any){
    if(confirm("Deseas eliminar este dato?"))
    {
      this.productoservice.eliminarProducto(id).subscribe(()=>{ 
        this.employeeList= this.employeeList.filter((obj:any)=>{
          return obj.id != id;
          
        });
      });
      this.infomostrar = this.employeeList;
    }
  }

  Guardar() {
    this.productoservice.crearProducto(this.ProductoForm.value).subscribe({
        next: (response:any) => {
            // Agregar el nuevo lote a la lista local con los datos de la respuesta
            this.employeeList.unshift(response.Producto);
            this.employeeObj = new Producto(); // Reiniciar el formulario
            this.infomostrar = this.employeeList; // Actualizar la vista
            this.createForm(); // Reiniciar el formulario para futuras entradas
            this.ngOnInit();
        },
        error: (err) => {
            console.error('Error al guardar el lote:', err);
        }
    });
  }

  Editar(item:Producto){
    this.employeeObj =item;
    this.createForm();
    this.setAction("2");
  }

  setAction(action: string){
    this.action = action;
  } 
  
  Modificar() {
    const updatedData = {
      id: this.ProductoForm.controls['id'].value,
      nombre : this.ProductoForm.controls['nombre'].value,
      tipo : this.ProductoForm.controls['tipo'].value,
      ubicacion : this.ProductoForm.controls['ubicacion'].value,      
    };

    this.productoservice.actualizarProducto(updatedData.id, updatedData).subscribe({
        next: (response) => {
            // Actualizar el registro en la lista local después de una respuesta exitosa
            const record = this.employeeList.find(m => m.id === updatedData.id);
            if (record) {
              Object.assign(record, response); // Actualiza el objeto con los datos devueltos por el servidor
              this.ngOnInit();
            }
            this.employeeObj = new Producto();
            this.createForm(); // Reinicia el formulario
        },
        error: (err) => {
            console.error('Error al modificar el lote:', err);
        }
    });
  }
}
