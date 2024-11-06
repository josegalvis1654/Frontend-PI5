import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proveedor } from '../model/lote.model';

@Injectable({
  providedIn: 'root',
})
export class ProveedoresService {
  private apiUrl = 'http://localhost:8002/api/proveedores/';
  constructor(private http: HttpClient) {}

  // Método para obtener todos los proveedores
  getProveedores(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(this.apiUrl);
  }

  getProducto(id: number): Observable<Proveedor> {
    return this.http.get<any>(`${this.apiUrl}${id}/`);
  }

  // Método para crear un nuevo proveedor
  createProveedor(proveedor: Proveedor): Observable<Proveedor> {
    return this.http.post<any>(this.apiUrl, proveedor);
  }

  // Método para actualizar un proveedor existente
  updateProveedor(id: number, proveedor: Proveedor): Observable<Proveedor> {
    return this.http.put<any>(`${this.apiUrl}${id}/`, proveedor);
  }

  // Método para eliminar un proveedor
  deleteProveedor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`);
  }
}
