import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddStudentComponent } from './add-student/add-student.component';
import { ListStudentComponent } from './list-student/list-student.component';

const studentRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'estudiante'
    },
    children: [
      {
        path: 'addStudent',
        component: AddStudentComponent,
        data:
        {
          title: 'Registrar Estudiante'
        }
      },
      {
        path: 'editStudent',
        component: AddStudentComponent,
        data:
        {
          title: 'Editar Estudiante'
        }
      },
      {
        path: 'listStudent',
        component: ListStudentComponent,
        data:
        {
          title: 'Listar Estudiante'
        }
      }
    ]
  }
];

@NgModule(
  {
    imports: [RouterModule.forChild(studentRoutes)],
    exports: [RouterModule]
  }
)

export class StudentRoutingModule{}
