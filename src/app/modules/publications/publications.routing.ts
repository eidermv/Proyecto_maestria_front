import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AddPublicationsComponent } from './add-publications/add-publications.component';

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
