import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StringApp } from '../../resources/stringApp';

const token = 'x-auth eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwbWFnZSIsIkF1dGhvcml0aHkiOiJDb29yZGluYWRvciIsImV4cCI6MTU0MTU0NDQ2Mn0.6t7rrzeFgicflivcvnWNgbKXQPn93s5uYpl3tDx_27BmVz7M9YVGjJHjoQGa52j2-pF4GEAB0wAZoMvMAE6W5g';

const httpOptions = {

  observe: 'response' as 'response',
  responseType: 'text' as 'text'
};


@Injectable()
export class AuthService
{

  stringApp : StringApp;

  constructor(private httpClient: HttpClient)
  {
    this.stringApp = new StringApp();
  }


  login(user: string, password: string)
  {
    const newStudent = JSON.stringify({usuario: user,
                                     contrasena: password});
    return this.httpClient.post<any>(this.stringApp.URL_SERVICIO_LOGIN,newStudent );
  }

   setSession(authResult) {
    sessionStorage.setItem('token', authResult['token']);
    sessionStorage.setItem('rol', authResult['roles']);
  }

  autorizationView()
  {
    return true;
  }


}
