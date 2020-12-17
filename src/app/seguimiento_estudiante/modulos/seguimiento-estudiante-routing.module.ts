import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListarSeguimientoEstudianteComponent} from '../componentes/listar-seguimiento-estudiante/listar-seguimiento-estudiante.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'seguimiento'
    },
    children: [
      {
        path: 'listar/:id',
        component: ListarSeguimientoEstudianteComponent,
        data:
          {
            title: 'Listar Seguimiento Estudiante'
          }
      }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguimientoEstudianteRoutingModule { }
