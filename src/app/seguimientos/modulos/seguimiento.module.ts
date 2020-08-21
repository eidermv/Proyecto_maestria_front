import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeguimientoRoutingModule } from './seguimiento-routing.module';
import { TutorService } from '../servicios/tutor.service';
import { EstudianteService } from '../servicios/estudiante.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SeguimientoRoutingModule
  ],
  providers: [TutorService, EstudianteService],
})
export class SeguimientoModule { }
