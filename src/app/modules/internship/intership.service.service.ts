import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StringApp } from '../../resources/stringApp';

@Injectable()
export class InternshipService {
  stringApp: StringApp;
  constructor(private httpClient: HttpClient)
  {
    this.stringApp = new StringApp();
  }

  getStudent()
  {
    return  this.httpClient.get(this.stringApp.URL_SERVICIO_GET_STUDENT_WHIT_TOKEN + sessionStorage.getItem('token'));
  }
}
