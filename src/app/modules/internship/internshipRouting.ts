import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddInternshipComponent } from './add-internship/add-internship.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'pasantia'
    },
    children: [
      {
        path: 'addIntership',
        component: AddInternshipComponent,
        data:
        {
          title: 'Registrar Pasantia'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InternshipRoutingModule { }
