import { ActividadTutor } from './../modelos/actividadTutor.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
const opcionesCumplido: string[] = ['Cumplida','No cumplida'];
const RUTA = 'http://localhost:8099';
@Injectable()
// tslint:disable-next-line: class-name
export class ActividadesTutorServices {
  actividad: ActividadTutor;
  constructor(private http: HttpClient, private fecha: DatePipe) {
    console.log('Servicio actividades funcionando');
  }
  // Esta función retorna las actividades relacionadas con un seguimiento

  obtenerActividadesTutor(id: number){
    return this.http.get<any>(RUTA + '/actividad/listarPorSeguimiento/' +id);
  }
  actividadActual(actividadActual: ActividadTutor){
    this.actividad = actividadActual;
  }
  obtenerTiposCumplida(){
  return opcionesCumplido;
  }
  editarActividad(act:any){
    console.log("ENTRO A ACTUALIZAR: ",act);
    this.http.put<any>(RUTA + '/actividad/editar/' + act.idSeguimiento, act)
    .subscribe(
      (response) => console.log('editar actividad: ' + response.estado),
      error => console.log('Error al editar: ' + JSON.stringify(error))
    );
  }
}
