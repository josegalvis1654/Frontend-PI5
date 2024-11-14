import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lote } from '../model/lote.model';  // Asegúrate de tener la interfaz de Lote bien definida
import { Producto } from '../model/lote.model';

@Injectable({
  providedIn: 'root'
})
export class LoteService {
  private apiUrl = 'http://localhost:8001/api/lotes/'; // URL de tu API (ajústala según sea necesario)

  constructor(private http: HttpClient) { }

  // Obtener todos los lotes
  getLotes(): Observable<Lote[]> {
    return this.http.get<Lote[]>(this.apiUrl).pipe(
    );
  }

  // Obtener un lote por ID
  getLote(id: number): Observable<Lote> {
    return this.http.get<Lote>(`${this.apiUrl}${id}/`).pipe(
    );
  }

  // Crear un nuevo lote
  crearLote(lote: Lote): Observable<any> {
    return this.http.post<any>(this.apiUrl, lote).pipe(
    );
  }

  // Actualizar un lote existente
  actualizarLote(id: number, lote: Lote): Observable<Lote> {
    return this.http.put<Lote>(`${this.apiUrl}${id}/`, lote).pipe(
    );
  }

  // Eliminar un lote
  eliminarLote(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`).pipe(
    );
  }
}
