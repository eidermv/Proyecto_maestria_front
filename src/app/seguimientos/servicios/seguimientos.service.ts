import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Seguimiento } from '../modelos/seguimiento.model';

const httpOptions = new HttpHeaders({ 'Content-Type': 'application/json'});

/** Constants used to fill up our data base. */
const PROYECTS: string[] = [
    'TESIS1', 'TESIS2', 'TESIS3', 'TESIS4', 'TESIS5'
  ];
  const TYPES: string[] = [
    'TESIS', 'PROPUESTA', 'TESIS', 'TESIS', 'PROPUESTA'
  ];
  const TUTORS: string[] = [
    'CARLOS', 'COBOS', 'SANDRA', 'BUITRÓN', 'FRANCISCO', 'NESTOR', 'ARDILA', 'HENDRIS', 'DANIEL'
  ];
  const STATUS: string[] = [
    'APROBADO', 'INICIADO', 'CANCELADO', 'NO APROBADO'
  ];
  const NAMES: string[] = [
    'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
    'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
  ];

@Injectable()
export class SeguimientosService {
    id:number=0;
    seguimientos:Array<Seguimiento>=[]; 
    onSeguimientos():Array<Seguimiento>
    {
        this.seguimientos=Array.from({ length: 100 }, (_, k) => this.crearSeguimiento(k + 1));
        return this.seguimientos;
    }
    crearSeguimiento(id: number): Seguimiento {

        const student = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
          NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';
        const tut = TUTORS[Math.round(Math.random() * (TUTORS.length - 1))] + ' ' +
          TUTORS[Math.round(Math.random() * (TUTORS.length - 1))].charAt(0) + '.';
        const proy = PROYECTS[Math.round(Math.random() * (PROYECTS.length - 1))];
        const type = TYPES[Math.round(Math.random() * (TYPES.length - 1))];
        const state = STATUS[Math.round(Math.random() * (STATUS.length - 1))];
        this.id+=1;
        const identificador=this.id;
        return {
          id: identificador,
          nombre: proy,
          tipo: type,
          tutor: tut,
          estudiante: student,
          estado: state,
          cohorte:"2020",
          oGeneral:"Nuevo objetivo",
          oEspecificos:[]
        };
    
      }
}