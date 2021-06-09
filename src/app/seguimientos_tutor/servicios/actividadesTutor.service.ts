import { ActividadTutor } from './../modelos/actividadTutor.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
const opcionesCumplido: string[] = ['Cumplida','No cumplida'];
const RUTA = environment.URL_SERVICIO;
@Injectable()
// tslint:disable-next-line: class-name
export class ActividadesTutorServices {
  actividad: ActividadTutor;
  constructor(private http: HttpClient, private fecha: DatePipe) {
    console.log('Servicio actividades funcionando');
  }
  // Esta función retorna las actividades relacionadas con un seguimiento

  obtenerActividadesTutor(id: number){
    return this.http.get<any>(RUTA + 'actividad/listarPorSeguimiento/' +id);
  }
  eliminarActividadTutor(id: number): Observable<any>
  {
    return this.http.delete<any>(RUTA + 'actividad/eliminar/' +id);
  }
  actividadActual(actividadActual: ActividadTutor){
    this.actividad = actividadActual;
  }
  obtenerTiposCumplida(){
  return opcionesCumplido;
  }
  editarActividad(act:any){

    this.http.put<any>(RUTA + 'actividad/editar', act)
    .subscribe(
      (response) => console.log('editar actividad: ' + response.estado),
      error => console.log('Error al editar: ' + JSON.stringify(error))
    );
  }
  agregarActividad(act:any){

    this.http.post<any>(RUTA + 'actividad/crear', act)
    .subscribe(
      (response) => console.log('crear actividad: ' + response.estado),
      error => console.log('Error al crear actividad: ' + JSON.stringify(error))
    );
  }
}
