import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';



@NgModule(
  {
    declarations: [LoginComponent],
    providers: [AuthService, AuthGuard]
  }
)

export class AuthModule{}
