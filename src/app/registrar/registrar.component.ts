import { Component } from '@angular/core';
import { Empleado } from '../empleado';
import { EmpleadoService } from '../empleado.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { catchError, tap, throwError } from 'rxjs';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css'
})
export class RegistrarComponent {

  empleado:Empleado = new Empleado();

  constructor(private empleadoService:EmpleadoService, private router:Router) {}

  registrarNuevoEmpleado() {
    this.empleadoService.registrarEmpleado(this.empleado).pipe(
      tap(dato => {
        console.log(dato);
        this.irAListaEmpleados();
      }),
      catchError(error => {
        console.log(error);
        return throwError(() => new Error(error));
      })
    ).subscribe();
  }

  irAListaEmpleados() {
    this.router.navigate(['']);
    Swal.fire('Empleado registrado', `El empleado ${this.empleado.nombre} ha sido registrado con exito`, `success`);
  }

  onSubmit() {
    this.registrarNuevoEmpleado();
  }

}
