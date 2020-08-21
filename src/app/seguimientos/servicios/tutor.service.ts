import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tutor } from '../modelos/tutor.model';
const httpOptions = new HttpHeaders({ 'Content-Type': 'application/json'});

@Injectable()
export class TutorService {
    tutores:Tutor[]=[];
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
            direccion:"carrera 33N 45-34",
            tipo:"Interno"          
        };
        this.tutores.push(nuevo);
        nuevo={
            nombre:"Sandra",
            apellido:"Buitron",
            identificacion:"10618776564",
            correo:"ccobos@unicauca.edu.co",
            telefono:"3008765666",
            direccion:"carrera 33N 45-34",
            tipo:"Interno"          
        };
        this.tutores.push(nuevo);
    }
}