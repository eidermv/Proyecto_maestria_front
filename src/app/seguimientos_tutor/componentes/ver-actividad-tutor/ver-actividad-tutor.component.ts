import { SeguimientosTutorServices } from './../../servicios/seguimientosTutor.service';
import { Component, Input, OnInit } from '@angular/core';
import { SeguimientoTutorCompleto } from '../../modelos/seguimientoTutorCompleto.model';
import { ActividadesTutorServices } from '../../servicios/actividadesTutor.service';
import { ActividadTutor } from '../../modelos/actividadTutor.model';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ver-actividad-tutor',
  templateUrl: './ver-actividad-tutor.component.html',
  styleUrls: ['./ver-actividad-tutor.component.css']
})
export class VerActividadTutorComponent implements OnInit {
  @Input() actividad: ActividadTutor;

  constructor(public dialogRef: MatDialogRef<VerActividadTutorComponent>) { }

  ngOnInit(): void {
  }
  okClick() {
    this.dialogRef.close();
  }
}
