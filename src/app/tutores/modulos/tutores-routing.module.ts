import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListarTutorComponent } from '../componentes/listar-tutor/listar-tutor.component';
import { CrearTutorComponent} from '../componentes/crear-tutor/crear-tutor.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'tutor'
    },
    children: [
      {
        path: 'listar',
        component: ListarTutorComponent,
        data:
        {
          title: 'Listar Tutores'
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
  export class TutoresRoutingModule { 
    
  }