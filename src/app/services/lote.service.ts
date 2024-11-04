// lote.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lote } from '../model/lote.model';

@Injectable({
  providedIn: 'root'
})
export class LoteService {
  private apiUrl = 'http://localhost:8000/api/lotes/'; // Cambia a tu URL de Django

  constructor(private http: HttpClient) {}

  // Crear lote
  crearLote(lote: Lote): Observable<Lote> {
    return this.http.post<Lote>(this.apiUrl, lote);
  }

  // Leer todos los lotes
  obtenerLotes(): Observable<Lote[]> {
    return this.http.get<Lote[]>(this.apiUrl);
  }

  // Actualizar lote
  actualizarLote(id: number, lote: Lote): Observable<Lote> {
    return this.http.put<Lote>(`${this.apiUrl}${id}/`, lote);
  }

  // Eliminar lote
  eliminarLote(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}
