import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tipo } from '../model/lote.model';

@Injectable({
  providedIn: 'root'
})
export class TipoService {
    private apiUrl = 'http://localhost:8001/api/tipo/'; // URL del backend
    constructor(private http: HttpClient) { }
    getTipo(): Observable<Tipo[]> {
        return this.http.get<Tipo[]>(this.apiUrl).pipe(
        );
    }
}