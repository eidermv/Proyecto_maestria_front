import { MatFormFieldModule } from '@angular/material/form-field';
import { SeguimientosService } from './../../seguimientos_admin/servicios/seguimientos.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeguimientosTutorRoutingModule } from './seguimientos-tutor-routing.module';
import { ListTutorSeguimientosComponent } from '../componentes/list-tutor-seguimientos/list-tutor-seguimientos.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NotificacionesTutorComponent } from '../componentes/notificaciones-tutor/notificaciones-tutor.component';
import { EditarSeguimientoTutorComponent } from '../componentes/editar-seguimiento-tutor/editar-seguimiento-tutor.component';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    ListTutorSeguimientosComponent,
    NotificacionesTutorComponent,
    EditarSeguimientoTutorComponent
  ],
  imports: [
    CommonModule,
    SeguimientosTutorRoutingModule,
    MatFormFieldModule,
    MatIconModule,
    MatTableModule,
    MatIconModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule
  ],
  providers: [SeguimientosService],
})
export class SeguimientosTutorModule { }
