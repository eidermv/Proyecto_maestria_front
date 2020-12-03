import { ActividadTutor } from './../modelos/actividadTutor.model';
import { Seguimiento } from './../../seguimientos_admin/modelos/seguimiento.model';
import { DataSource } from '@angular/cdk/table';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SeguimientoTutor } from '../modelos/seguimientoTutor.model';
import { TipoSeguimiento } from '../../seguimientos_admin/modelos/tipoSeguimiento.model';
import { EstadoProyecto } from '../../seguimientos_admin/modelos/estadosProyecto.model';
import { EstadoSeguimiento } from '../../seguimientos_admin/modelos/estadoSeguimiento.model';
const RUTA = 'http://localhost:8099';
@Injectable()
// tslint:disable-next-line: class-name
export class SeguimientosTutorServices {
  // variable que almacena los datos de un seguimiento, el cual se puede editar etc...

  constructor(private http: HttpClient) { }
  Seguimiento: SeguimientoTutor [] = [
    {
      idSeguimiento: 1,
      nombre: 'seguimiento1',
      tipoSeguimiento: 'Tesis',
      tutor: 'sandra buitron',
      estudiante: 'Miller Santiado Castillo Muñoz',
      codirector: 'Francisco pino',
      estadoProyecto: 'desarrollo',
      cohorte: '2018',
      objetivoGeneral: 'objetivo1',
      objetivosEspecificos: 'objetivo especifico1',
      estadoSeguimiento: 'Aceptado',
      id_estudiante: 0,
      id_tutor: 0,
      idTipoSeguimiento: '0',
      idEstadoSeguimiento: '0',
      idEstadoProyecto: '0'
    }
  ];
  // variable que almacena los seguimientos asociados a un tutor
  seguimientos: SeguimientoTutor[] = [
    /*{
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
      estadoSeguimiento: 'espera'
    },
    {
      id: 2,
      nombre: 'seguimiento2',
      tipo: 'Tesis',
      tutor: 'Hendris P',
      estudiante: 'Miguel Solano',
      coodirector: 'Francisco pino',
      estado: 'desarrollo',
      cohorte: '2020',
      oGeneral: 'objetivo1',
      oEspecificos: 'objetivo especifico1',
      estadoSeguimiento: 'espera'
    },
    {
      id: 3,
      nombre: 'seguimiento3',
      tipo: 'Tesis',
      tutor: 'sandra buitron',
      estudiante: 'Jhonatan zuñiga',
      coodirector: 'Francisco pino',
      estado: 'desarrollo',
      cohorte: '2018',
      oGeneral: 'objetivo1',
      oEspecificos: 'objetivo especifico1',
      estadoSeguimiento: 'espera'
    },
    {
      id: 4,
      nombre: 'seguimiento4',
      tipo: 'Tesis',
      tutor: 'Cesar Collazos',
      estudiante: 'Andres Perez',
      coodirector: 'nuevo',
      estado: 'desarrollo',
      cohorte: '2018',
      oGeneral: 'objetivo1',
      oEspecificos: 'objetivo especifico1',
      estadoSeguimiento: 'aceptado'
    },
    {
      id: 5,
      nombre: 'seguimiento5',
      tipo: 'Tesis',
      tutor: 'Carlos Collazos',
      estudiante: 'Jose Tobar',
      coodirector: 'nuevo',
      estado: 'desarrollo',
      cohorte: '2019',
      oGeneral: 'objetivo1',
      oEspecificos: 'objetivo especifico1',
      estadoSeguimiento: 'rechazado'
    }*/
  ];
  notificaciones: SeguimientoTutor[] = [
    /*{

      idSeguimiento: 3,
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
    }*/
  ];
  // lista las actividades relacionadas a un seguimiento
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

  // Esta función retorna las actividades relacionadas con un seguimiento
  obtenerActividades() {
    return this.actividades;
  }
  // Esta función se usa para recibir en arreglo de notificaciones para el tutor
  obtenerSeguimiento() {
    return  this.Seguimiento;
  }
  obtenerNotificaciones() {
    return this.notificaciones;
  }
  // Se usa para recibir la información de los seguimientos relacionados con un tutor
  obtenerSeguimientosTutor(id: number) {
    return this.http.get<any>(RUTA + '/seguimiento/listarPorTutor/' + id);
  }
  onEstadosSeguimientos() {

  }
  estadosSeguimientos(): EstadoSeguimiento[] {
    this.onEstadosSeguimientos(); // Hago peticion
    const nuevo: EstadoSeguimiento[] = [
      {id: 1, nombre: 'Aceptado'},
      {id: 2, nombre: 'Rechazado'}
    ];
    console.log('Retornando desde estados:  ', nuevo);
    return nuevo;
  }
  onEstadosProyecto() {

  }
  estadosProyecto(): EstadoProyecto[] {
    this.onEstadosProyecto(); // Hago peticion
    const nuevo: EstadoProyecto[] = [
      {id: 1, nombre: 'Cancelado'},
      {id: 2, nombre: 'Iniciado'}
    ];
    return nuevo;
  }
  onTiposSeguimiento() {

  }
  tiposSeguimiento(): TipoSeguimiento[] {
    this.onTiposSeguimiento(); // Hago peticion
    const nuevo: TipoSeguimiento[] = [
      {id: 1, nombre: 'Tesis'},
      {id: 2, nombre: 'Propuesta'}
    ];
    return nuevo;
  }

  // Se usa para enviar la informacion editada por el tutor
  guardarSeguimientoTutor(seguimientotutor: SeguimientoTutor) {
    this.http.put<any>(RUTA + '/seguimiento/editar/' + seguimientotutor.idSeguimiento, seguimientotutor)
    .subscribe(
      (response) => console.log('resultado guardar: ' + response.estado),
      error => console.log('Error al guardar: ' + JSON.stringify(error))
    );
  }
  onSeguimientosTutor() {
    this.http.get(RUTA + '/seguimiento/listarPorTutor/1').subscribe(
      result => {
        console.log('Seguimientos tutor:  ', result);
      }
    );

  }
}
