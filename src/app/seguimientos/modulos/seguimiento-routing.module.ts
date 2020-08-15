import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListSeguimientosComponent } from '../componentes/list-seguimientos/list-seguimientos.component';

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

