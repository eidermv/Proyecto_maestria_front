import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeguimientosTutorRoutingModule } from './seguimientos-tutor-routing.module';
import { ListTutorSeguimientosComponent } from '../componentes/list-tutor-seguimientos/list-tutor-seguimientos.component';


@NgModule({
  declarations: [
    ListTutorSeguimientosComponent
  ],
  imports: [
    CommonModule,
    SeguimientosTutorRoutingModule,
  ]
})
export class SeguimientosTutorModule { }
