import { Injectable } from '@angular/core';
import { Actividad } from '../modelos/actividad.model';
import { DatePipe } from '@angular/common';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
/** Constants used to fill up our data base. */
const SEMANAS: string[] = [
  'SEMANA 1', 'SEMANA 2', 'SEMANA 3', 'SEMANA 4', 'SEMANA 6', 'SEMANA 7', 'SEMANA 8','SEMANA 9'
];
const ENTREGAS: string[] = [
  'Primera Actividad a entregar', 'Segunda Actividad a entregar', 'Tercera Actividad a entregar', 'Cuarta Actividad a entregar'];

  const COMPROMISOS: string[] = [
    'Me comprometo a entregar actividad 1 y 2', 'Me comprometo a entregar actividad 2,3 y 4', 'Me comprometo a entregar actividad 1,2,3,4 y 5'
  ];
  const FECHAS: string[] = [
    "2020-03-25", "2020-04-11", "2020-07-27","2020-08-01","2020-06-13","2020-05-12"
  ];
  const RUTA=environment.URL_SERVICIO;
@Injectable({
  providedIn: 'root'
})


export class ActividadesService {

constructor(private datePipe: DatePipe, private http: HttpClient) { }
id = 0;
cump=0;
actividades: Array<Actividad> = [];
onActividades(id:number): Array<Actividad> {
    this.actividades = Array.from({ length: 5 }, (_, k) => this.crearActividad(k + 1));

    return this.actividades;
}
getActividades(id_seguimiento:number): Observable<any> {
  return this.http.get(RUTA+'/actividad/listarPorVisibilidad/'+id_seguimiento);
}
crearActividad(id: number): Actividad {

  const sem = SEMANAS[Math.round(Math.random() * (SEMANAS.length - 1))];
  const entr = ENTREGAS[Math.round(Math.random() * (ENTREGAS.length - 1))];
  const compr = COMPROMISOS[Math.round(Math.random() * (COMPROMISOS.length - 1))];
  const fi = FECHAS[Math.round(Math.random() * (FECHAS.length - 1))];
  const fe = FECHAS[Math.round(Math.random() * (FECHAS.length - 1))];
    this.id += 1;
    const identificador = this.id;
    if(this.cump==0)
    this.cump=1;
    else this.cump=0;

    return {
      id:this.id,
    semana:sem,
    fecha_inicio: new Date(fi),
    fecha_entrega: new Date(fe),
    entregas: entr,
    compromisos: compr,
    cumplido: this.cump,
    visibilidad:1-this.cump
    };
  }


}
