import { ActividadTutor } from './../modelos/actividadTutor.model';
import { Seguimiento } from './../../seguimientos_admin/modelos/seguimiento.model';
import { DataSource } from '@angular/cdk/table';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { distinct } from 'rxjs/operators';


@Injectable()
// tslint:disable-next-line: class-name
export class ActividadesTutorServices {
  // variable que almacena los datos de un seguimiento, el cual se puede editar etc...

  //lista las actividades relacionadas a un seguimiento
  actividades: ActividadTutor[] = [
    {
      id: 1,
      semana: 'Semana 1',
      fecha_inicio: new Date('2020-05-05'),
      fecha_entrega: new Date('2020-05-12'),
      entregas: 'realizó entrega de la busqueda',
      compromisos: '1. realizar busqueda en la literatura',
      cumplido: 1,
      visibilidad: 1
    },
    {
      id: 2,
      semana: 'Semana 2',
      fecha_inicio: new Date('2016-05-12'),
      fecha_entrega: new Date('2016-05-19'),
      entregas: 'realizó tatatatat entrega de la busqueda',
      compromisos: '1. realizar busqueda en la literatura',
      cumplido: 1,
      visibilidad: 1
    }
  ];
  constructor(private httpClient: HttpClient, private fecha: DatePipe) {
    console.log('Servicio actividades funcionando')
  }
  // Esta función retorna las actividades relacionadas con un seguimiento
  obtenerActividades() {
    return this.actividades;
  }
}
