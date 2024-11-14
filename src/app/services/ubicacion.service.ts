import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ubicacion } from '../model/lote.model';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {
    private apiUrl = 'http://localhost:8001/api/ubicacion/'; // URL del backend
    constructor(private http: HttpClient) { }
    getUbicacion(): Observable<Ubicacion[]> {
        return this.http.get<Ubicacion[]>(this.apiUrl).pipe(
        );
    }
}