import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddInternshipComponent } from './add-internship/add-internship.component';
import { ListInternshipForStudentComponent } from './list-internship-for-student/list-internship-for-student.component';
import { ListInternshipForAdminComponent } from './list-internship-for-admin/list-internship-for-admin.component';

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
      {
        path: 'listInternshipForStudent',
        component: ListInternshipForStudentComponent,
        data:
        {
          title: 'Mis Pasantias'
        }
      },
      {
        path: 'listInternshipForStudent/:msj',
        component: ListInternshipForStudentComponent,
        data:
        {
          title: 'Mis Pasantias'
        }
      },
      {
        path: 'listInsternshipAdmin',
        component: ListInternshipForAdminComponent,
        data:
        {
          title: 'Pasantias'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InternshipRoutingModule { }
