import { EmpleadoService } from './../empleado.service';
import { Component } from '@angular/core';
import { Empleado } from '../empleado';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-empleados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-empleados.component.html',
  styleUrl: './lista-empleados.component.css'
})
export class ListaEmpleadosComponent {

  empleados:Empleado[];

  constructor(private empleadoService:EmpleadoService, private router:Router) {
    this.obtenerListaEmpleados();
  }

  private obtenerListaEmpleados() {
    this.empleadoService.obtenerEmpleados().subscribe(datos => {
      this.empleados = datos;
    });
  }

  actualizarEmpleado(id:number) {
    this.router.navigate(['actualizarEmpleado', id]);
  }

  eliminarEmpleado(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Confirma si deseas eliminar al empleado",
      icon: 'warning', // Cambiado 'type' a 'icon'
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, elimínalo',
      cancelButtonText: 'No, cancelar',
      buttonsStyling: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.empleadoService.eliminarEmpleado(id).subscribe(dato => {
          console.log(dato);
          this.obtenerListaEmpleados();
          Swal.fire(
            'Empleado eliminado',
            'El empleado ha sido eliminado con exito',
            'success'
          )
        })
      }
    });
  }

  verDetalles(id:number) {
    this.router.navigate(['detallesEmpleado', id]);
  }

}
