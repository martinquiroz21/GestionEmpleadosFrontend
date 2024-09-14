import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadoService } from '../empleado.service';
import { Empleado } from '../empleado';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalles',
  standalone: true,
  imports: [],
  templateUrl: './detalles.component.html',
  styleUrl: './detalles.component.css'
})
export class DetallesComponent implements OnInit {

  id:number;
  empleado:Empleado;

  constructor(private router:ActivatedRoute, private empleadoService:EmpleadoService) {}

  ngOnInit(): void {
      this.id = this.router.snapshot.params['id'];
      this.empleado = new Empleado();
      this.empleadoService.obtenerEmpleadoPorId(this.id).subscribe(dato => {
        this.empleado = dato;
        Swal.fire(`Detalles del empleado: ${this.empleado.nombre}`);
      });
  }

}
