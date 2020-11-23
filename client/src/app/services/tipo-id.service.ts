import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IdNombre } from '../models/id-nombre';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoIDService {

  private API_URI = 'http://localhost:3000/tipoIDs';

  constructor(private http: HttpClient) { }

  getTiposID(): Observable<IdNombre> {
    return this.http.get(this.API_URI);
  }
}