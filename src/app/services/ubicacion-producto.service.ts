import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UbicacionProductoService {
    private apiUrl = 'http://localhost:8001/api/ubicacionproductos/'; // URL del backend
    constructor(private http: HttpClient) { }
    obtenerUbicacionConMasProductos(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }
}