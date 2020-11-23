import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Paciente } from '../models/paciente'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private API_URI = 'http://localhost:3000/pacientes';

  constructor(private http: HttpClient) { }

  getPacientes(): Observable<Paciente> {
    return this.http.get(this.API_URI);
  }

  setPaciente(paciente: any): Observable<any> {
    return this.http.post(this.API_URI, paciente, {responseType: 'text'});
  }

  updatePaciente(paciente: any): Observable<any> {
    return this.http.put(this.API_URI, paciente, {responseType: 'text'});
  }

  deletePaciente(id: string): Observable<any> {
    return this.http.delete(`${this.API_URI}/${id}`, {responseType: 'text'});
  }
}