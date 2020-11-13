import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Seguimiento } from '../modelos/seguimiento.model';
import { EstadoSeguimiento } from '../modelos/estadoSeguimiento.model';
import { EstadoProyecto } from '../modelos/estadosProyecto.model';
import { TipoSeguimiento } from '../modelos/tipoSeguimiento.model';

const httpOptions = new HttpHeaders({ 'Content-Type': 'application/json'});
const RUTA="http://localhost:8099";
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
    id = 0;
    seguimientos: Array<Seguimiento> = [];
    constructor(private http: HttpClient) { }
    onSeguimientos(): Array<Seguimiento> {
        this.seguimientos = Array.from({ length: 100 }, (_, k) => this.crearSeguimiento(k + 1));
        return this.seguimientos;
    }
    getSeguimientos(): Observable<any> {      
      return this.http.get(RUTA+'/seguimiento/listar');
    }
  
    seguimiento(n:number):Seguimiento
    {
      return this.crearSeguimiento(n);
    }
    onEditSeguimiento(seg:Seguimiento):Observable<any>
    {
      const s = JSON.stringify( {
        id_seguimiento:seg.id,
        nombre:seg.nombre,
        id_tutor:seg.tutor,
        codirector:seg.coodirector,
        id_estudiante:seg.estudiante,
        cohorte:seg.cohorte,
        objetivos:seg.oGeneral,
        objetivos_especificos:seg.oEspecificos,
        id_estado_proyecto:seg.estado,
        id_tipo_seguimiento: seg.tipo,
        id_estado_seguimiento:seg.estadoSeguimiento
      });
      return this.http.put(RUTA+'/seguimiento/editar',s, {headers : new HttpHeaders({ 'Content-Type': 'application/json'}) ,
      reportProgress: true, observe: 'events'});
    }
    crearSeguimiento(id: number): Seguimiento {

        const student = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
          NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';
        const tut = TUTORS[Math.round(Math.random() * (TUTORS.length - 1))] + ' ' +
          TUTORS[Math.round(Math.random() * (TUTORS.length - 1))].charAt(0) + '.';
        const proy = PROYECTS[Math.round(Math.random() * (PROYECTS.length - 1))];
        const type = TYPES[Math.round(Math.random() * (TYPES.length - 1))];
        const state = STATUS[Math.round(Math.random() * (STATUS.length - 1))];
        this.id += 1;
        const identificador = this.id;
        return {
          id: identificador,
          nombre: proy,
          tipo: type,
          tutor: tut,
          estudiante: student,
          coodirector: "nuevo",
          estado: state,
          cohorte: '2020',
          oGeneral: 'Nuevo objetivo',
          oEspecificos: "HACER UN PROTOTIPO DE INTERFAZ QUE PERMITA TALES COSAS",
          estadoSeguimiento:"Aprobado"
        };
      }
      onEstadosSeguimientos():Observable<any>
      {
        return this.http.get(RUTA+'/estado_seguimiento/estados');
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
      onEstadosProyecto():Observable<any>
      {
        return this.http.get(RUTA+'/estado_proyecto/estados');
      }
      estadosProyecto():EstadoProyecto[]
      {
        this.onEstadosProyecto(); //Hago peticion
        let nuevo:EstadoProyecto[] =[
          {id:1, nombre:"Cancelado"},
          {id:2, nombre:"Iniciado"}
        ];
        return nuevo;
      }
      onTiposSeguimiento():Observable<any>
      {
        return this.http.get(RUTA+'/tipo_seguimiento/tipos');
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
}
