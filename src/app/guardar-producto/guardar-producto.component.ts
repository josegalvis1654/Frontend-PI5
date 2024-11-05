import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Producto } from '../model/lote.model';
import { ProductoService } from '../services/producto.service'; // Importa el servicio
import { HttpErrorResponse } from '@angular/common/http'; // Importa para manejar errores

@Component({
  selector: 'app-guardar-producto',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './guardar-producto.component.html',
  styleUrls: ['./guardar-producto.component.css'] // Cambia styleUrl a styleUrls
})
export default class GuardarProductoComponent {
  ProductoForm: FormGroup = new FormGroup({});
  employeeObj: Producto = new Producto();
  employeeList: Producto[] = [];
  action: string;
  filtrar: string;
  infomostrar: any;

  constructor(private productoService: ProductoService) { // Inyecta el servicio
    this.createForm();
    this.filtrar = '';
    this.action = "1";
    this.loadProductos(); // Carga los productos al inicializar el componente
  }

  createForm() {
    this.ProductoForm = new FormGroup({
      Id: new FormControl(this.employeeObj.id), // Usa el tipo string para Id
      nombre: new FormControl(this.employeeObj.nombre),
      tipo: new FormControl(this.employeeObj.tipo),
      ubicacion: new FormControl(this.employeeObj.ubicacion),
    });
  }

  loadProductos() {
    this.productoService.getProductos().subscribe(
      (data: Producto[]) => {
        this.employeeList = data;
        this.infomostrar = this.employeeList; // Asigna los datos cargados
      },
      (error: HttpErrorResponse) => {
        console.error('Error al cargar productos:', error);
      }
    );
  }

  filter(event: any) {
    this.infomostrar = this.employeeList.filter((obj: Producto) => {
      return obj.nombre.toLocaleLowerCase().indexOf(event.toLocaleLowerCase()) > -1;
    });
  }

  deleteInfo(event: any, nombre: string) {
    if (confirm("Deseas eliminar este dato?")) {
        const productoAEliminar = this.employeeList.find((obj: Producto) => obj.nombre === nombre);
        if (productoAEliminar) {
            this.productoService.eliminarProducto(Number(productoAEliminar.id)).subscribe(
                () => {
                    this.employeeList = this.employeeList.filter((obj: Producto) => obj.nombre !== nombre);
                    this.infomostrar = this.employeeList;
                },
                (error: HttpErrorResponse) => {
                    console.error('Error al eliminar el producto:', error);
                }
            );
        }
    }
  }

  Guardar() {
    if (this.ProductoForm.valid) {
      this.productoService.crearProducto(this.ProductoForm.value).subscribe(
        (nuevoProducto: Producto) => {
          this.employeeList.unshift(nuevoProducto); // Agrega el nuevo producto a la lista
          this.infomostrar = this.employeeList;
          this.employeeObj = new Producto();
          this.createForm();
        },
        (error: HttpErrorResponse) => {
          console.error('Error al guardar el producto:', error);
        }
      );
    } else {
      console.error('Formulario inválido');
    }
  }

  Editar(item: Producto) {
    this.employeeObj = item;
    this.createForm(); // Re-crea el formulario con los datos del producto a editar
    this.ProductoForm.patchValue(item); // Rellena el formulario con los datos del producto
    this.setAction("2");
  }

  setAction(action: string) {
    this.action = action;
  }

  Modificar() {
    const id = this.ProductoForm.controls['Id'].value; // Se asegura que Id sea un string
    this.productoService.actualizarProducto(Number(id), this.ProductoForm.value).subscribe(
      (productoActualizado: Producto) => {
        const index = this.employeeList.findIndex(m => m.id === id);
        if (index !== -1) {
          this.employeeList[index] = productoActualizado; // Actualiza el producto en la lista
          this.infomostrar = this.employeeList;
        }
        this.employeeObj = new Producto();
        this.createForm();
      },
      (error: HttpErrorResponse) => {
        console.error('Error al modificar el producto:', error);
      }
    );
  }
}

