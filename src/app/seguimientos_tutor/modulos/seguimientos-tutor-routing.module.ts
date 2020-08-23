import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListTutorSeguimientosComponent } from '../componentes/list-tutor-seguimientos/list-tutor-seguimientos.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'seguimiento-tutor'
    },
    children: [
      {
        path: 'listarTutorSeguimientos',
        component: ListTutorSeguimientosComponent,
        data:
        {
          title: 'Listar Seguimientos'
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
export class SeguimientosTutorRoutingModule {}
