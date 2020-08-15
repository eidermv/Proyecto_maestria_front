import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListSeguimientosComponent } from '../componentes/list-seguimientos/list-seguimientos.component';

const routes: Routes = [
  {
    path:'',
    children: 
    [
      {
        path: 'listar', component:ListSeguimientosComponent,
      }
    ]
},
  {
    path: '**', redirectTo: 'login', pathMatch: 'full'
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguimientoRoutingModule { }

