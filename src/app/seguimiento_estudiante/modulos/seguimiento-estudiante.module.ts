import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeguimientoEstudianteRoutingModule } from './seguimiento-estudiante-routing.module';
import {ListarSeguimientoEstudianteComponent} from '../componentes/listar-seguimiento-estudiante/listar-seguimiento-estudiante.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    ListarSeguimientoEstudianteComponent
  ],
  imports: [
    CommonModule,
    SeguimientoEstudianteRoutingModule,
    MatFormFieldModule,
    MatIconModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule
  ]
})
export class SeguimientoEstudianteModule { }
