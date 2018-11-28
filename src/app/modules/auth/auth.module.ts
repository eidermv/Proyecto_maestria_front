import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS}  from '@angular/common/http';
import { TokenInterceptorService } from './token-interceptor.service';
import { AccesDenyInterceptorService } from './accesDeny-interceptor.service';
import { ModalWindowsModule } from '../modal-windows/modal-windows.module';
import { ModalModule } from 'ngx-bootstrap/modal';
@NgModule(
  {
    declarations: [LoginComponent],
    imports: [ ReactiveFormsModule,
               FormsModule,
               CommonModule,
               ModalModule.forRoot()],
    providers: [AuthService, AuthGuard, {provide: HTTP_INTERCEPTORS,
                                          useClass: TokenInterceptorService,
                                          multi: true,
                                        },
                                        {
                                          provide: HTTP_INTERCEPTORS,
                                          useClass: AccesDenyInterceptorService,
                                          multi: true
                                        }
              ],
  }
)

export class AuthModule{}
