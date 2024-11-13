import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProveedorLoteService {
    private apiUrl = 'http://localhost:8001/api/proveedorlotes/'; // URL del backend
    constructor(private http: HttpClient) { }
    obtenerProveedorConMasLotes(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }
}