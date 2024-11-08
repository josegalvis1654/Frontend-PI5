import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../model/lote.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'http://localhost:8001/api/productos/'; // Asegúrate de que esta URL coincida con tu configuración de Django
  constructor(private http: HttpClient) { }

  // Obtener todos los productos
  getProductos(): Observable<Producto[]> {
    return this.http.get<any>(this.apiUrl);
  }

  // Obtener un producto por ID
  getProducto(id: number): Observable<Producto> {
    return this.http.get<any>(`${this.apiUrl}${id}/`);
  }

  // Crear un nuevo producto
  crearProducto(Producto: Producto): Observable<any> {
    return this.http.post<any>(this.apiUrl, Producto);
  }

  // Actualizar un producto
  actualizarProducto(id: number, Producto: Producto): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${id}/`, Producto);
  }

  // Eliminar un producto
  eliminarProducto(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${id}/`);
  }
}
