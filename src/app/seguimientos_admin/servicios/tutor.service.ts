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
        this.tutores=[];
        let nuevo :Tutor;
        nuevo={
            nombre:"Carlos",
            apellido:"Cobos",
            identificacion:"10618776564",
            correo:"ccobos@unicauca.edu.co",
            telefono:"3008765666",
            departamento:"Sistemas",
            grupoInvestigacion:"SIR",
            tipo:"Interno",
            universidad:"Universidad del Cauca"          
        };
        this.tutores.push(nuevo);
        nuevo={
            nombre:"Sandra",
            apellido:"Buitron",
            identificacion:"10618776564",
            correo:"ccobos@unicauca.edu.co",
            telefono:"3008765666",
            departamento:"Sistemas",
            grupoInvestigacion:"SIR",
            tipo:"Interno",
            universidad:"Universidad del Cauca"            
        };
        this.tutores.push(nuevo);
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
}