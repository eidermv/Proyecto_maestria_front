import { CrearTutorComponent } from './../componentes/tutores/crear-tutor/crear-tutor.component';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tutor } from '../modelos/tutor.model';
import { TipoTutor } from '../modelos/tipoTutor.model';
const httpOptions = new HttpHeaders({ 'Content-Type': 'application/json'});
const RUTA="http://localhost:8099";
@Injectable()
export class TutorService {
    tutores:Tutor[]=[];

    constructor(private http: HttpClient) { }
    onTutores():void
    {
        
    }
    getTutores(): Observable<any>
    {
      return this.http.get(RUTA+'/tutor/listar');
    }
    onTiposTutor(): Observable<any> {
      return this.http.get(RUTA+'/tipo_tutor/tipos');
    }
    tiposTutor():TipoTutor[]
    {
      this.onTiposTutor(); //Hago peticion
      let nuevo:TipoTutor[] =[
        {id:1, nombre:"Externo"},
        {id:2, nombre:"Interno"}
      ];
      return nuevo;
    }
    eliminarTutor(id:number):Observable<any>{
        return this.http.delete(RUTA+'/tutor/eliminar/'+id);
    }
    onCrearTutor(t:any):Observable<any>{
      return this.http.post(RUTA+'/tutor/crear',t, {headers : new HttpHeaders({ 'Content-Type': 'application/json'}) ,
      reportProgress: true, observe: 'events'});
    }
    onEditTutor(t:any):Observable<any>
    {     
      console.log("TUTOR EN EDITAR:   ",t);
      return this.http.put(RUTA+'/tutor/editar', t, {headers : new HttpHeaders({ 'Content-Type': 'application/json'}) ,
      reportProgress: true, observe: 'events'});
    }
}