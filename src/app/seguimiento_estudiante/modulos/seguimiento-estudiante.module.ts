import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeguimientoEstudianteRoutingModule } from './seguimiento-estudiante-routing.module';
import {ListarSeguimientoEstudianteComponent} from '../componentes/listar-seguimiento-estudiante/listar-seguimiento-estudiante.component';


@NgModule({
  declarations: [
    ListarSeguimientoEstudianteComponent
  ],
  imports: [
    CommonModule,
    SeguimientoEstudianteRoutingModule
  ]
})
export class SeguimientoEstudianteModule { }
