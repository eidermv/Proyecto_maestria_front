import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TipoSeguimiento } from '../../seguimientos_admin/modelos/tipoSeguimiento.model';
import { EstadoProyecto } from '../../seguimientos_admin/modelos/estadosProyecto.model';
import { EstadoSeguimiento } from '../../seguimientos_admin/modelos/estadoSeguimiento.model';
import { SeguimientoTutorCompleto } from '../modelos/seguimientoTutorCompleto.model';
import { environment } from '../../../environments/environment';
const RUTA = environment.URL_SERVICIO;
@Injectable()
// tslint:disable-next-line: class-name

export class SeguimientosTutorServices {
  // variable que almacena los datos de un seguimiento, el cual se puede editar etc...
  seguimiento: SeguimientoTutorCompleto;
  constructor(private http: HttpClient) { }
    // variable que almacena los seguimientos asociados a un tutor



  // Esta función retorna las actividades relacionadas con un seguimiento

  //Este servicio guarda el seguimiento actual
  seguimientoActual(seguimientoActual: SeguimientoTutorCompleto){
    this.seguimiento = seguimientoActual;
  }

  // Se usa para recibir la información de los seguimientos relacionados con un tutor
  obtenerSeguimientosTutor(id: number){
    return this.http.get<any>(RUTA + 'seguimiento/listarPorTutor/' + id);
  }
  //Listado estados proyecto
  listarEstadosProyecto(){
    return this.http.get<any>(RUTA+'estado_proyecto/estados');
  }
  onEstadosSeguimientos() {

  }
  estadosSeguimientos(): EstadoSeguimiento[] {
    this.onEstadosSeguimientos(); // Hago peticion
    const nuevo: EstadoSeguimiento[] = [
      {id: 1, nombre: 'Aceptado'},
      {id: 2, nombre: 'Rechazado'}
    ];

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
  guardarSeguimientoTutor(seguimientotutor: any) {
    this.http.put<any>(RUTA + 'seguimiento/editar/' + seguimientotutor.idSeguimiento, seguimientotutor)
    .subscribe(
      (response) => console.log('resultado guardar: ' + response.estado),
      error => console.log('Error al guardar: ' + JSON.stringify(error))
    );
  }
  onSeguimientosTutor() {
    this.http.get(RUTA + 'seguimiento/listarPorTutor/1').subscribe(
      result => {

      }
    );

  }
}
