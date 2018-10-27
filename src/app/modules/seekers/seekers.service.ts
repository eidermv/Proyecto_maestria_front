import { Injectable } from '@angular/core';
import { StringApp } from '../../resources/stringApp';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Line} from '../../models/line';
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

  searchStudent()
  {
  }

}
