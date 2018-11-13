import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AddPublicationsComponent } from './add-publications/add-publications.component';
import { ListPublicationForStudentComponent } from './list-publication-for-student/list-publication-for-student.component';

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
        path: 'listPublications',
        component: ListPublicationForStudentComponent,
        data:
        {
          title: 'Listar Publicaciónes'
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
