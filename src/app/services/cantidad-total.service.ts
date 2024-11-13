import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CantidadTotalService {
    private apiUrl = 'http://localhost:8001/api/cantidadtotal/'; // URL del backend
    constructor(private http: HttpClient) { }
    obtenerTotalCantidadPorProducto(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }
}