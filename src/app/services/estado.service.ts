import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estado } from '../model/lote.model';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {
    private apiUrl = 'http://localhost:8001/api/estado/'; // URL del backend
    constructor(private http: HttpClient) { }
    getEstado(): Observable<Estado[]> {
        return this.http.get<Estado[]>(this.apiUrl).pipe(
        );
    }
}