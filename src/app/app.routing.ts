import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Template
import { ElementsTemplateComponent } from './core/elementsTemplate/elementsTemplate.component';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { AuthGuard } from './modules/auth/auth-guard.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: '',
    component: ElementsTemplateComponent,
    data: {
      title: 'Inicio'
    },
    children: [
      {
        path: 'student',
        canActivate: [AuthGuard],
        loadChildren: './modules/student/student.module#StudentModule'
      },
      {
        path: 'publication',
        canActivate: [AuthGuard],
        loadChildren: './modules/publications/publications.module#PublicationModule'
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
