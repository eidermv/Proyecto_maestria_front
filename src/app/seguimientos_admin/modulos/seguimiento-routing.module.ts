import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListSeguimientosComponent } from '../componentes/list-seguimientos/list-seguimientos.component';
import { AgregarSeguimientoComponent } from '../componentes/agregarSeguimiento/agregar-seguimiento/agregar-seguimiento.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'seguimiento'
    },
    children: [
      {
        path: 'listar',
        component: ListSeguimientosComponent,
        data:
        {
          title: 'Listar Seguimiento'
        }
      },
      {
        path: 'agregar',
        component: AgregarSeguimientoComponent,
        data:
        {
          title: 'Agregar Seguimiento'
        }
      }
    ]
  },
  {path: '**', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguimientoRoutingModule { }

