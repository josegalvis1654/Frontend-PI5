import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificacionService {
  private apiUrl = 'http://localhost:3000/productos'; // Cambiar por la URL del microservicio.
  constructor(private http: HttpClient) {}
  obtenerCantidadTotalProductos() {
    return this.http.get<{producto__nombre: string; total_cantidad: number}>(`${this.apiUrl}/cantidad-total`);
  }
  obtenerLotesVencen() {
    return this.http.get<any[]>(`${this.apiUrl}/lotes-vencen`);
  }
}