import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Stock } from '../models/stock';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private API_URI = 'http://localhost:3000/laboratorio-medicamentos';

  constructor(private http: HttpClient) { }

  getStock(value: any): Observable<Stock> {
    return this.http.post(this.API_URI, value);
  }

  getLabMed(): Observable<Stock> {
    return this.http.get(this.API_URI);
  }
}