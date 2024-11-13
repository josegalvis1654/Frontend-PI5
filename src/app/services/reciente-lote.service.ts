import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecienteLoteService {
    private apiUrl = 'http://localhost:8001/api/lotereciente/'; // URL del backend
    constructor(private http: HttpClient) { }
    obtenerLotesRecientes(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }
}