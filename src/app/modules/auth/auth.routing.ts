
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';


const loginRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'auth'
    },
    children: [
      {
        path: 'longin',
        component: LoginComponent,
        data:
        {
          title: 'Login'
        }
      }
    ]
  }
];


@NgModule(
  {
    imports: [RouterModule.forChild(loginRoutes)],
    exports: [RouterModule]
  }
)

export class AuthRoutingModule{}
