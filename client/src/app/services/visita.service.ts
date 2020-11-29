import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IdNombre } from '../models/id-nombre'
import { Visita } from '../models/visita'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisitaService {

  private API_URI = 'http://localhost:3000/visita';

  constructor(private http: HttpClient) { }

  getVisita(medico: any): Observable<Visita> {
    return this.http.post(`${this.API_URI}/visita-medico`, medico);
  }

  getVisitaPacientes(): Observable<IdNombre> {
    return this.http.get(`${this.API_URI}/pacientes`);
  }

  setVisita(visita: any): Observable<any> {
    return this.http.post(this.API_URI, visita, {responseType: 'text'});
  }

  updateVisita(visita: any): Observable<any> {
    return this.http.put(this.API_URI, visita, {responseType: 'text'});
  }

  deleteVisita(value: any): Observable<any> {
    return this.http.post(`${this.API_URI}/delete`, value, {responseType: 'text'});
  }
}