import { MatFormFieldModule } from '@angular/material/form-field';
import { SeguimientosService } from './../../seguimientos_admin/servicios/seguimientos.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeguimientosTutorRoutingModule } from './seguimientos-tutor-routing.module';
import { ListTutorSeguimientosComponent } from '../componentes/list-tutor-seguimientos/list-tutor-seguimientos.component';

import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorIntl} from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';
import {FormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import { NotificacionesTutorComponent } from '../componentes/notificaciones-tutor/notificaciones-tutor.component';
import { EditarSeguimientoTutorComponent } from '../componentes/editar-seguimiento-tutor/editar-seguimiento-tutor.component';


@NgModule({
  declarations: [
    ListTutorSeguimientosComponent,
    NotificacionesTutorComponent,
    EditarSeguimientoTutorComponent
  ],
  imports: [
    CommonModule,
    SeguimientosTutorRoutingModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,    
    MatIconModule,
    MatPaginatorModule,
    MatCardModule,
    MatAutocompleteModule,
    MatProgressBarModule,
    MatButtonModule,
    MatExpansionModule,
  ],
  providers: [SeguimientosService],
})
export class SeguimientosTutorModule { }
