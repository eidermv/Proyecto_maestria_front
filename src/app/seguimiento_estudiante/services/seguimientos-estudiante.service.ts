import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const RUTA = 'http://localhost:8099';
@Injectable({
  providedIn: 'root'
})
export class SeguimientosEstudianteService {

constructor(private http: HttpClient) { }
obtenerSeguimientosEstudiante(id: number){
  return this.http.get<any>(RUTA + '/seguimiento/listarPorEstudiante/' + id);
}
obtenerActividadesEstudiante(id: number){
  return this.http.get<any>(RUTA + '/actividad/listarPorSeguimiento/' +id);
}

}
