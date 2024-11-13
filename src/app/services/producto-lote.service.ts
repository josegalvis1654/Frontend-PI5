import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoLoteService {
    private apiUrl = 'http://localhost:8001/api/productolotes/'; // URL del backend
    constructor(private http: HttpClient) { }
    obtenerProductoConMasLotes(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }
}