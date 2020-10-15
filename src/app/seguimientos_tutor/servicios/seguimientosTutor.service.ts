import { Observable } from 'rxjs';
import { ActividadTutor } from './../modelos/actividadTutor.model';
import { Seguimiento } from './../../seguimientos_admin/modelos/seguimiento.model';
import { DataSource } from '@angular/cdk/table';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SeguimientoTutor } from '../modelos/seguimientoTutor.model';
import { TipoSeguimiento } from '../../seguimientos_admin/modelos/tipoSeguimiento.model';
import { EstadoProyecto } from '../../seguimientos_admin/modelos/estadosProyecto.model';
import { EstadoSeguimiento } from '../../seguimientos_admin/modelos/estadoSeguimiento.model';

@Injectable()
// tslint:disable-next-line: class-name
export class SeguimientosTutorServices {
  // variable que almacena los datos de un seguimiento, el cual se puede editar etc...
  Seguimiento: SeguimientoTutor [] = [
    {
      id: 1,
      nombre: 'seguimiento1',
      tipo: 'Tesis',
      tutor: 'sandra buitron',
      estudiante: 'Miller Santiado Castillo Muñoz',
      coodirector: 'Francisco pino',
      estado: 'desarrollo',
      cohorte: '2018',
      oGeneral: 'objetivo1',
      oEspecificos: 'objetivo especifico1',
      estadoSeguimiento: 'aceptado'
    }
  ];
  notificaciones: SeguimientoTutor[] =[
    {
      id: 3,
      nombre: 'seguimiento1',
      tipo: 'Tesis',
      tutor: 'sandra buitron',
      estudiante: 'Eider arley',
      coodirector: 'Francisco pino',
      estado: 'desarrollo',
      cohorte: '2018',
      oGeneral: 'objetivo1',
      oEspecificos: 'objetivo especifico1',
      estadoSeguimiento: 'espera'
    },
    {
      id: 4,
      nombre: 'seguimiento2',
      tipo: 'Tesis',
      tutor: 'sandra buitron',
      estudiante: 'Camilo certuche',
      coodirector: 'Francisco pino',
      estado: 'desarrollo',
      cohorte: '2018',
      oGeneral: 'objetivo1',
      oEspecificos: 'objetivo especifico1',
      estadoSeguimiento: 'espera'
    }
  ]
  //lista las actividades relacionadas a un seguimiento
  actividades: ActividadTutor[] = [
    {
      id: 1,
      semana: 'Semana 1',
      fecha_inicio: new Date(2020 / 3 / 18),
      fecha_entrega: new Date(2020 / 3 / 25),
      entregas: 'realizó entrega de la busqueda',
      compromisos: '1. realizar busqueda en la literatura',
      cumplido: 1,
      visibilidad: 1
    },
    {
      id: 2,
      semana: 'Semana 2',
      fecha_inicio: new Date(2020 / 3 / 18),
      fecha_entrega: new Date(2020 / 3 / 25),
      entregas: 'realizó entrega de la busqueda',
      compromisos: '1. realizar busqueda en la literatura',
      cumplido: 1,
      visibilidad: 1
    }
  ];
  constructor(private httpClient: HttpClient) {
    console.log('Servicio funcionando')
  }
  // Esta función retorna las actividades relacionadas con un seguimiento
  obtenerActividades() {
    return this.actividades;
  }
  // Esta función se usa para recibir en arreglo de notificaciones para el tutor
  obtenerSeguimiento() {
    return  this.Seguimiento;
  }
  obtenerNotificaciones(idTutor: number) {
    return this.httpClient.get('http://localhost:8099/notificacion/listar/' + idTutor);
  }
  //Se usa para recibir la información de los seguimientos relacionados con un tutor
  obtenerSeguimientosTutor(idTutor: number): Observable<any> {
    return this.httpClient.get('http://localhost:8099/seguimiento/listarPorTutor/' + idTutor);
  }
  onEstadosSeguimientos()
  {

  }
  estadosSeguimientos():EstadoSeguimiento[]
  {
    this.onEstadosSeguimientos(); //Hago peticion
    let nuevo:EstadoSeguimiento[] =[
      {id:1, nombre:"Aceptado"},
      {id:2, nombre:"Rechazado"}
    ];
    console.log("Retornando desde estados:  ",nuevo);
    return nuevo;
  }
  onEstadosProyecto()
  {

  }
  estadosProyecto(): EstadoProyecto[]
  {
    this.onEstadosProyecto(); //Hago peticion
    let nuevo:EstadoProyecto[] =[
      {id:1, nombre:"Cancelado"},
      {id:2, nombre:"Iniciado"}
    ];
    return nuevo;
  }
  onTiposSeguimiento()
  {

  }
  tiposSeguimiento():TipoSeguimiento[]
  {
    this.onTiposSeguimiento(); //Hago peticion
    let nuevo:TipoSeguimiento[] =[
      {id:1, nombre:"Tesis"},
      {id:2, nombre:"Propuesta"}
    ];
    return nuevo;
  }

  // Se usa para enviar la informacion editada por el tutor
  guardarSeguimientoTutor(seguimientotutor: SeguimientoTutor) {
    this.httpClient.post('https://listado-personas.json', seguimientotutor)
    .subscribe(
      response => console.log("resultado guardar personas: "+ response),
      error => console.log("Error al guardar Personas: "+ error)
    );
  }
}
