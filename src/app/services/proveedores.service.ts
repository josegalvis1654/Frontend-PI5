import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proveedor } from '../model/lote.model';

@Injectable({
  providedIn: 'root',
})
export class ProveedoresService {
  // Define la URL base de la API de Django (ajusta esta URL según tu configuración)
  private apiUrl = 'http://localhost:8000/api/proveedores/';

  // Constructor para inyectar HttpClient
  constructor(private http: HttpClient) {}

  // Método para obtener todos los proveedores
  getProveedores(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(this.apiUrl);
  }

  // Método para crear un nuevo proveedor
  createProveedor(proveedor: Proveedor): Observable<Proveedor> {
    return this.http.post<Proveedor>(this.apiUrl, proveedor, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  // Método para actualizar un proveedor existente
  updateProveedor(id: number, proveedor: Proveedor): Observable<Proveedor> {
    return this.http.put<Proveedor>(`${this.apiUrl}${id}/`, proveedor, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  // Método para eliminar un proveedor
  deleteProveedor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`);
  }
}
