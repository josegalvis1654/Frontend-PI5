import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CaducarLoteService {
    private apiUrl = 'http://localhost:8001/api/lotescaducar/'; // URL del backend
    constructor(private http: HttpClient) { }
    obtenerLotesProximosACaducar(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }
}