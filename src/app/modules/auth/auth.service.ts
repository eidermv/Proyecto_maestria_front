import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StringApp } from '../../resources/stringApp';
import { Router } from '@angular/router';
import {PermisosService} from '../../guards/permisos.service';
import Swal from "sweetalert2";
const httpOptions = {

  observe: 'response' as 'response',
  responseType: 'text' as 'text'
};


@Injectable()
export class AuthService {

  stringApp: StringApp;

  constructor(private httpClient: HttpClient, private router: Router, private permiso: PermisosService) {
    this.stringApp = new StringApp();
  }


  login(user: string, password: string) {
    const newStudent = JSON.stringify({usuario: user,
                                     contrasena: password});
    return this.httpClient.post<any>(this.stringApp.URL_SERVICIO_LOGIN, newStudent, { reportProgress: true, observe: 'events'} );
  }

  getStudent() {
    if (this.permiso.valor === 'Estudiante') {
      console.log("ES UN ESTUDIANTE###################");
      this.httpClient.get(this.stringApp.URL_SERVICIO_GET_STUDENT_WHIT_TOKEN + sessionStorage.getItem('token'))
        .subscribe(data => {
            sessionStorage.setItem('code', data['codigo']);
            sessionStorage.setItem('nameStudent', data['nombres'] + ' ' + data['apellidos']);
          },
          err => {
            this.router.navigate(['/404']);
          });
    } else if (this.permiso.valor === 'Tutor') {
      
      console.log("ES UN TUTOR###################");
      Swal.fire(
        'Tutor',
        'Logeado como tutur',
        'error'
      );
    }
  }


   setSession(authResult) {
    sessionStorage.setItem('token', authResult['token']);
     console.log('roles desde el back ' + authResult['roles']);
    sessionStorage.setItem('rol', authResult['roles']);
    this.permiso.rolActivo(authResult['roles']);
  }

  autorizationView() {
    return true;
  }


}
