import { Injectable } from '@angular/core';
import { StringApp } from '../../resources/stringApp';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Line} from '../../models/line';
import { Observable } from 'rxjs';



@Injectable()
export class PublicationService
{
  stringApp: StringApp = new StringApp();

  URL: String = this.stringApp.URL_SERVICIO_GET_ALL_TUTORS;
  constructor(private httpClient: HttpClient)
  {

  }



  sentFile(fileSend: File){
    console.log('llegue');
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                'Authorization': localStorage.getItem('token')})
    };
    const formData: FormData = new FormData();
    formData.append('File', fileSend);
    return this.httpClient.post(this.stringApp.URL_SERVICIO_REGISTRY_PUBLICATIONS, formData, httpOptions);
    }

  }

