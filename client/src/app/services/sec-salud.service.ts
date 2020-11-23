import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { idNombreApellido } from '../models/id-nombre-apellido';
import { Auth } from '../models/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecSaludService {

  private API_URI = 'http://localhost:3000/secSalud';

  constructor(private http: HttpClient) { }

  getMiembros(): Observable<idNombreApellido> {
    return this.http.get(this.API_URI);
  }

  singIn(value: any): Observable<Auth> {
    return this.http.post(`${this.API_URI}/user`, value);
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('miembro');
  }
}