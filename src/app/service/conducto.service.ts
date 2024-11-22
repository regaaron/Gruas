import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConductoService {
  private apiUrl = 'http://localhost:3000/api/conductores';

  constructor( private http: HttpClient) { }

  // Guardar conducto
  saveDriver(driver: any): Observable<any>{
    return this.http.post(this.apiUrl,driver);
  }

  // Obtener conductores
  getDrivers(): Observable<any>{
    return this.http.get(this.apiUrl);
  }


}
