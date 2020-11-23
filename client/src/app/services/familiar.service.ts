import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { PersonaRelacionada } from '../models/persona-relacionada'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FamiliarService {

  private API_URI = 'http://localhost:3000/familiar';

  constructor(private http: HttpClient) { }

  getPersonaRelacionada(): Observable<PersonaRelacionada> {
    return this.http.get(this.API_URI);
  }

  setPersonaRelacionada(personaRelacionada: any): Observable<any> {
    return this.http.post(this.API_URI, personaRelacionada, {responseType: 'text'});
  }

  updatePersonaRelacionada(personaRelacionada: any): Observable<any> {
    return this.http.put(this.API_URI, personaRelacionada, {responseType: 'text'});
  }

  deletePersonaRelacionada(valor: any): Observable<any> {
    return this.http.post(`${this.API_URI}/delete`, valor, {responseType: 'text'});
  }
}