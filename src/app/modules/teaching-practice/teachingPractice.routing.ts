import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddTeachingPracticeComponent } from './add-teaching-practice/add-teaching-practice.component';
import { ListTeachingPracticeForStudentComponent } from './list-teaching-practice-for-student/list-teaching-practice-for-student.component';
import { ListTeachingPracticeForAdminComponent } from './list-teaching-practice-for-admin/list-teaching-practice-for-admin.component';

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
      {
        path: 'listTeachingPracticeforStudent',
        component: ListTeachingPracticeForStudentComponent,
        data:
        {
          title: 'Listado de Practicas Docentes'
        }
      },
      {
        path: 'listTeachingPracticeforStudent/:msj',
        component: ListTeachingPracticeForStudentComponent,
        data:
        {
          title: 'Listado de Practicas Docentes'
        }
      },
      {
        path: 'listTeachingPracticeAdmin',
        component: ListTeachingPracticeForAdminComponent,
        data:
        {
          title: 'Listado de Practicas Docentes'
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
