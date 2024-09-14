import { Routes } from '@angular/router';
import { ListaEmpleadosComponent } from './lista-empleados/lista-empleados.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { ActualizarComponent } from './actualizar/actualizar.component';
import { DetallesComponent } from './detalles/detalles.component';

export const routes: Routes = [
    {path: 'empleados', component:ListaEmpleadosComponent},
    {path: '', redirectTo: 'empleados', pathMatch: 'full'},
    {path: 'registrarEmpleado', component:RegistrarComponent},
    {path: 'actualizarEmpleado/:id', component:ActualizarComponent},
    {path: 'detallesEmpleado/:id', component:DetallesComponent}
];
