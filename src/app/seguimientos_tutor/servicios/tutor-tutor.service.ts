import { TutorCompleto } from './../modelos/tutorCompleto.model';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
const httpOptions = new HttpHeaders({ 'Content-Type': 'application/json'});
const RUTA=environment.URL_SERVICIO;
@Injectable()
export class TutorTutorService {
    constructor(private http: HttpClient) { }

    onTiposTutor(){
      return this.http.get<any>(RUTA+'/tipo_tutor/tipos');
    }
}
