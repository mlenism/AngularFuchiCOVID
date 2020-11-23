import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Medico } from '../models/medico';
import { IdNombre } from '../models/id-nombre'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  private API_URI = 'http://localhost:3000/profesionalSalud';

  constructor(private http: HttpClient) { }

  getMedicos(): Observable<Medico> {
    return this.http.get(this.API_URI);
  }

  getMedicosFullName(): Observable<IdNombre> {
    return this.http.get(`${this.API_URI}/full`);
  }

  setMedico(medico: any): Observable<any> {
    return this.http.post(this.API_URI, medico, {responseType: 'text'});
  }

  updateMedico(medico: any): Observable<any> {
    return this.http.put(this.API_URI, medico, {responseType: 'text'});
  }

  deleteMedico(id: string): Observable<any> {
    return this.http.delete(`${this.API_URI}/${id}`, {responseType: 'text'});
  }
}