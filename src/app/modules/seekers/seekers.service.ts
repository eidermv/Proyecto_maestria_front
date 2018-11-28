import { Injectable } from '@angular/core';
import { StringApp } from '../../resources/stringApp';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable()
export class SeekersService
{
  stringApp: StringApp = new StringApp();

  constructor(private httpClient: HttpClient)
  {

  }

  searchStudent(student: string)
  {
    return this.httpClient.get<Array<any>>(this.stringApp.URL_SERVICIO_SEARCH_STUDENT + student);
  }

  searchCity(city: string)
  {
    return this.httpClient.get<Array<any>>(this.stringApp.API_CITIES + this.stringApp.API_SERVICE_SEARCH
                               + city + this.stringApp.API_PARAMS_REQUEST);
  }

}
