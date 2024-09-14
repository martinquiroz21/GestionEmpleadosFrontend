import { Component } from '@angular/core';
import { Empleado } from '../empleado';
import { EmpleadoService } from '../empleado.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { catchError, of, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actualizar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './actualizar.component.html',
  styleUrl: './actualizar.component.css'
})
export class ActualizarComponent {

  id: number;
  empleado: Empleado = new Empleado();

  constructor(private empleadoService: EmpleadoService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.empleadoService.obtenerEmpleadoPorId(this.id).pipe(
      tap(dato => { //realiza algun efecto secundario
        this.empleado = dato;
      }),
      catchError(error => {
        console.error(error);
        return of(null); // Retorna un observable vacío en caso de error
      })
    ).subscribe();
  }

  irAlaListaDeEmpleados() {
    this.router.navigate(['/empleados']);
    Swal.fire('Empleado actualizado', `El empleado ${this.empleado.nombre} ha sido actualizado con exito`, `success`);
  }

  onSubmit(): void {
    if (this.empleado) {
      this.empleadoService.actualizarEmpleado(this.id, this.empleado).pipe(
        tap(dato => {
          this.irAlaListaDeEmpleados(); // Redirige en caso de éxito
        }),
        catchError(error => {
          console.error('Error al actualizar el empleado:', error);
          return of(null); // Retorna un observable vacío en caso de error
        })
      ).subscribe(); // Realiza la suscripción
    }
  }

}
