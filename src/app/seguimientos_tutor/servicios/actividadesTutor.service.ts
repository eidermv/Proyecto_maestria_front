import { ActividadTutor } from './../modelos/actividadTutor.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

const RUTA = 'http://localhost:8099';
@Injectable()
// tslint:disable-next-line: class-name
export class ActividadesTutorServices {
  constructor(private http: HttpClient, private fecha: DatePipe) {
    console.log('Servicio actividades funcionando');
  }
  // Esta función retorna las actividades relacionadas con un seguimiento

  obtenerActividadesTutor(id: number){
    return this.http.get<any>(RUTA + '/actividad/listarPorSeguimiento/' +id);
  }
}
