import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddTeachingPracticeComponent } from './add-teaching-practice/add-teaching-practice.component';

const teachingPracticeRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'practica docente'
    },
    children: [
      {
        path: 'addTeachingPractice',
        component: AddTeachingPracticeComponent,
        data:
        {
          title: 'Registrar Practica Docente'
        }
      },
    ]
  }
];

@NgModule(
  {
    imports: [RouterModule.forChild(teachingPracticeRoutes)],
    exports: [RouterModule]
  }
)

export class TeachingPracticeRoutingModule
{

}
