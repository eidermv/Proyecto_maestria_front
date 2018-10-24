import { Injectable } from '@angular/core';
import { StringApp } from '../../resources/stringApp';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Line} from '../../models/line';
import { Observable } from 'rxjs';



@Injectable()
export class LineService
{
  stringApp: StringApp = new StringApp();

  URL: String = this.stringApp.URL_SERVICIO;
  constructor(private httpClient: HttpClient)
  {

  }



  addLineService(line: Line){
    const descrip: String = line.getDescription();
    const newLine = JSON.stringify({description: descrip});
    console.log(newLine);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'})
    };
    return this.httpClient.post(this.stringApp.URL_SERVICIO + 'line', newLine, httpOptions);
    }
  }

