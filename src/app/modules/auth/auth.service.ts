import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { StringApp } from '../../resources/stringApp';
import { Router } from '@angular/router';
import {PermisosService} from '../../guards/permisos.service';
import Swal from 'sweetalert2';
const httpOptions = {

  observe: 'response' as 'response',
  responseType: 'text' as 'text'
};


@Injectable()
export class AuthService {

  stringApp: StringApp;
  public infoTutor: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public infoEstudiante: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private httpClient: HttpClient, private router: Router, private permiso: PermisosService) {
    this.stringApp = new StringApp();
  }


  login(user: string, password: string) {
    const newStudent = JSON.stringify({usuario: user,
                                     contrasena: password});
    return this.httpClient.post<any>(this.stringApp.URL_SERVICIO_LOGIN, newStudent, { reportProgress: true, observe: 'events'} );
  }

  getPersona() {
      this.httpClient.get<any>(this.stringApp.URL_SERVICIO_GET_STUDENT_WHIT_TOKEN + sessionStorage.getItem('token'))
        .subscribe((data) => {
          if (data.estado === 'exito') {
            if (sessionStorage.getItem('rol') === 'Estudiante') {
              console.log('ES UN ESTUDIANTE###################:       ',data.data[0]);
              localStorage.setItem('code', data.data[0].codigo);
              localStorage.setItem('id', data.data[0].id);
              localStorage.setItem('nameStudent', data.data[0].nombres + ' ' + data.data[0].apellidos);

              console.log("ID ASIGNADO A SESSION STORAGE:  ",localStorage.getItem('id'));
          } else if (sessionStorage.getItem('rol') === 'Tutor') {

              console.log('ES UN TUTOR################### ' + JSON.stringify(data.data[0]));
              localStorage.setItem('id', data.data[0].id_tutor);
              this.infoTutor.next(true);
            } else {
              console.log('OTRO ROL');
            }
          }
          },
          err => {
            this.router.navigate(['/404']);
          });
  }


   setSession(authResult) {
    sessionStorage.setItem('token', authResult['token']);
     console.log('roles desde el back ' + authResult['roles']);
    sessionStorage.setItem('rol', authResult['roles']);
    // this.permiso.rolActivo(authResult['roles']);
     if (sessionStorage.getItem('rol') !== 'Coordinador') {
       this.getPersona();
     }
  }

  autorizationView() {
    return true;
  }


}
