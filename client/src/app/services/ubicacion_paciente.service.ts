import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ubicacion_paciente } from '../models/ubicacion_paciente'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UbicacionPacienteService {

  private API_URI = 'http://localhost:3000/ubicacion-pacientes';

  constructor(private http: HttpClient) { }

  getUbicacionPacientes(): Promise<any[]> {
    return this.http.get<any[]>(this.API_URI).toPromise();
  }
}