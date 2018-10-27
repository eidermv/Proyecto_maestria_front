import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};


@Injectable()
export class AuthService
{

  constructor(private httpClient: HttpClient){}

  authUser(user: string, password: string)
  {
    let url = 'http://192.168.1.63:8080/login';
    const newStudent = JSON.stringify({usuario: user,
                                     contrasena: password});
    return this.httpClient.post(url, newStudent, httpOptions);
  }

  login()
  {
    this.saveLocalStorage();
    return true;
  }

  saveLocalStorage()
  {
    let auth1 =
    {
      token: 'aksdjfalksdjfkasdf----',
      tipoUsuario: 'bueno'
    }

    localStorage.setItem('sesion', JSON.stringify(auth1));
  }

}
