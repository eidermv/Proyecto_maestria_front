import { AddLineComponent } from './addLine/addLine.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditLineComponent } from './edit-line/edit-line.component';

const lineRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'linea'
    },
    children: [
      {
        path: 'addLine',
        component: AddLineComponent,
        data:
        {
          title: 'Registrar Linea'
        }
      },
      {
        path: 'editLine',
        component: EditLineComponent,
        data:
        {
          title: 'Editar Linea'
        }
      }
    ]
  }
];


@NgModule(
  {
    imports: [RouterModule.forChild(lineRoutes)],
    exports: [RouterModule]
  }
)

export class LineRoutingModule{}
