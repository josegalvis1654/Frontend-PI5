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
      Id: new FormControl(this.employeeObj.Id), // Usa el tipo string para Id
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

  deleteInfo(event: any, columna1: string) {
    if (confirm("Deseas eliminar este dato?")) {
        const productoAEliminar = this.employeeList.find((obj: Producto) => obj.nombre === columna1);
        if (productoAEliminar) {
            this.productoService.eliminar(Number(productoAEliminar.Id)).subscribe( // Convierte a number aquí si es necesario
                () => {
                    this.employeeList = this.employeeList.filter((obj: Producto) => obj.nombre !== columna1);
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
    this.productoService.crear(this.ProductoForm.value).subscribe(
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
  }

  Editar(item: Producto) {
    this.employeeObj = item;
    this.createForm();
    this.setAction("2");
  }

  setAction(action: string) {
    this.action = action;
  }

  Modificar() {
    const id = this.ProductoForm.controls['Id'].value; // Se asegura que Id sea un string
    this.productoService.actualizar(Number(id), this.ProductoForm.value).subscribe( // Convertir a número si la API lo requiere
      (productoActualizado: Producto) => {
        const index = this.employeeList.findIndex(m => m.Id === id);
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
