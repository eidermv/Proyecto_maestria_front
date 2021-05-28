import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../../models/student';
import { environment } from '../../../environments/environment';

const httpOptions = new HttpHeaders({ 'Content-Type': 'application/json' });
const RUTA = environment.URL_SERVICIO;


@Injectable()
export class EstudianteService {
    estudiantes: Student[] = [];
    constructor(private httpClient: HttpClient) { }

    onEstudiantes(): Observable<any> {
        return this.httpClient.get(RUTA + '/estudiante/buscar/todo');
    }

}




//QUEMAR DATOS DE ESTUDIANTES 2

/*  this.estudiantes=[];
       let nuevo = new Student();
       nuevo.setName("Miller"),
       nuevo.setSurname("Munoz"),
       nuevo.setId("10618776564"),
       nuevo.setEmail("mcastillo@unicauca.edu.co"),
       nuevo.setState("matriculado"),
       nuevo.setCohorte("2020"),
       nuevo.setEnteredBy(""),
       nuevo.setCodigo("104615021746"),
       nuevo.setEnteredSemester("3"),
       nuevo.setTutor("Carlos Cobos");
       this.estudiantes.push(nuevo);
       let nuevo2 = new Student();
       nuevo2.setName("Eider"),
       nuevo2.setSurname("Munoz"),
       nuevo2.setId("10618776564"),
       nuevo2.setEmail("emunoz@unicauca.edu.co"),
       nuevo2.setState("matriculado"),
       nuevo2.setCohorte("2020"),
       nuevo2.setEnteredBy(""),
       nuevo2.setCodigo("104615021746"),
       nuevo2.setEnteredSemester("3"),
       nuevo2.setTutor("Sandra Buitron");
       this.estudiantes.push(nuevo2); */
