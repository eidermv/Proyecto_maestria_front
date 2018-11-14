import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AddPublicationsComponent } from './add-publications/add-publications.component';
import { ListPublicationForStudentComponent } from './list-publication-for-student/list-publication-for-student.component';
import { ListPublicationForAdminComponent } from './list-publication-for-admin/list-publication-for-admin.component';

const publicationsRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'publicaciones'
    },
    children: [
      {
        path: 'addPublications',
        component: AddPublicationsComponent,
        data:
        {
          title: 'Agregar Publicación'
        }
      },
      {
        path: 'listPublicationsEstudent',
        component: ListPublicationForStudentComponent,
        data:
        {
          title: 'Listar Publicaciónes'
        }
      },
      {
        path: 'listPublicationsEstudent/:msj',
        component: ListPublicationForStudentComponent,
        data:
        {
          title: 'Listar Publicaciónes'
        }
      },
      {
        path: 'listPublicationsAdmin',
        component: ListPublicationForAdminComponent,
        data:
        {
          title: 'Listar Todas Las Publicaciónes'
        }
      }
    ]
  }
];



@NgModule(
  {
    imports: [RouterModule.forChild(publicationsRoutes)],
    exports: [RouterModule]
  }
)

export class PublicationRoutingModule{}
