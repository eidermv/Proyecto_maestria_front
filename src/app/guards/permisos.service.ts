import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {tap} from 'rxjs/operators';
import {StringApp} from '../resources/stringApp';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {

  valor = '';

  constructor(private http: HttpClient) { }

  rolActivo(rol: string) {
    this.valor = rol;
  }

  limpiarServicio() {
    this.valor = '';
  }
}
