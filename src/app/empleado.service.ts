import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empleado } from './empleado';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  // URL donde se obtiene todos los empleados del backend
  private baseURL = "http://localhost:8080/api/v1/empleados";

  constructor(private HttpClient: HttpClient) {}

  obtenerEmpleados():Observable<Empleado[]> {
    return this.HttpClient.get<Empleado[]>(`${this.baseURL}`);
  }

  registrarEmpleado(empleado:Empleado): Observable<Empleado> {
    return this.HttpClient.post<Empleado>(`${this.baseURL}`, empleado);
  }

  obtenerEmpleadoPorId(id:number): Observable<Empleado> {
    return this.HttpClient.get<Empleado>(`${this.baseURL}/${id}`);
  }

  actualizarEmpleado(id: number, empleado: Empleado): Observable<Object> {
    return this.HttpClient.put(`${this.baseURL}/${id}`, empleado);
  }

  eliminarEmpleado(id:number): Observable<Empleado> {
    return this.HttpClient.delete<Empleado>(`${this.baseURL}/${id}`);
  }
  
}
