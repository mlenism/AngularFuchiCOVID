import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IdNombre } from '../models/id-nombre';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {

  private API_URI = 'http://localhost:3000/estadisticas';

  constructor(private http: HttpClient) { }

  getEstadisticas(): Observable<IdNombre> {
    return this.http.get(this.API_URI);
  }
}
