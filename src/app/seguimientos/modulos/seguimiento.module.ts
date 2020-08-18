import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeguimientoRoutingModule } from './seguimiento-routing.module';
import { TutorService } from '../servicios/tutor.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SeguimientoRoutingModule
  ],
  providers: [TutorService],
})
export class SeguimientoModule { }
