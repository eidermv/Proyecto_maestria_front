import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActividadTutor } from '../../modelos/actividadTutor.model';
import { ActividadesTutorServices } from '../../servicios/actividadesTutor.service';


@Component({
  selector: 'app-editar-actividad-tutor',
  templateUrl: './editar-actividad-tutor.component.html',
  styleUrls: ['./editar-actividad-tutor.component.css']
})
export class EditarActividadTutorComponent implements OnInit {
  actividad:ActividadTutor;
  
  constructor(public dialogRef: MatDialogRef<EditarActividadTutorComponent>, private actividadService:ActividadesTutorServices) { }

  ngOnInit(): void {
    this.actividad=this.actividadService.actividades[0];
  }
  okClick() {
    this.dialogRef.close();
  }

}
