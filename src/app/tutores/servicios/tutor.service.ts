import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tutor } from '../modelos/tutor.model';
const httpOptions = new HttpHeaders({ 'Content-Type': 'application/json'});

@Injectable()
export class TutorService {
    tutores:Array<Tutor>=[];
    public onTutores():void
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
}