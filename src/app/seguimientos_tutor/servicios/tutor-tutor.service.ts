import { TutorCompleto } from './../modelos/tutorCompleto.model';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
const httpOptions = new HttpHeaders({ 'Content-Type': 'application/json'});
const RUTA="http://localhost:8099";
@Injectable()
export class TutorTutorService {
    constructor(private http: HttpClient) { }

    onTiposTutor(){
      return this.http.get<any>(RUTA+'/tipo_tutor/tipos');
    }
}
