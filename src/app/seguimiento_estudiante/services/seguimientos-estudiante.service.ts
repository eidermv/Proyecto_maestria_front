import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
const RUTA = environment.URL_SERVICIO;
@Injectable({
  providedIn: 'root'
})
export class SeguimientosEstudianteService {

constructor(private http: HttpClient) { }
obtenerSeguimientosEstudiante(id: number){
  return this.http.get<any>(RUTA + 'seguimiento/listarPorEstudiante/' + id);
}
obtenerActividadesEstudiante(id: number){
  return this.http.get<any>(RUTA + 'actividad/listarPorSeguimiento/' +id);
}

}
