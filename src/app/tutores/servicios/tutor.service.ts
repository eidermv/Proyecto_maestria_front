import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tutor } from '../modelos/tutor.model';
import { environment } from '../../../environments/environment';
const httpOptions = new HttpHeaders({ 'Content-Type': 'application/json'});
const RUTA=environment.URL_SERVICIO;
@Injectable()
export class TutorService {
    tutores:Array<Tutor>=[];
    constructor(private http: HttpClient){

    }
    getTutores(): Observable<any>
    {
      return this.http.get(RUTA+'/tutor/listar');
    }
    onTiposTutor(): Observable<any> {
      return this.http.get(RUTA+'/tipo_tutor/tipos');
    }

      eliminarTutor(id:number): Observable<any>
      {

        return this.http.delete(RUTA+'/tutor/eliminar/'+id);
      }

}
