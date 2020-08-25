import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListTutorSeguimientosComponent } from '../componentes/list-tutor-seguimientos/list-tutor-seguimientos.component';
import { NotificacionesTutorComponent } from '../componentes/notificaciones-tutor/notificaciones-tutor.component';
import { EditarSeguimientoTutorComponent } from '../componentes/editar-seguimiento-tutor/editar-seguimiento-tutor.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'seguimientos_tutor'
    },
    children: [
      {
        path: 'listarTutorSeguimientos',
        component: ListTutorSeguimientosComponent,
        data:
        {
          title: 'Listar Seguimientos'
        }
      },
      {
        path: 'notificacionesTutor',
        component: NotificacionesTutorComponent,
        data:
        {
          title: 'Notificaciones Tutor'
        }
      },
      {
        path: 'editarSeguimientoTutor',
        component: EditarSeguimientoTutorComponent,
        data:
        {
          title: 'Editar seguimientos tutor'
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
