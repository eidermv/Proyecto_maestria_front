import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import { Actividad } from '../../../seguimientos_admin/modelos/actividad.model';

@Component({
  selector: 'app-ver-actividad-estudiante',
  templateUrl: './ver-actividad-estudiante.component.html',
  styleUrls: ['./ver-actividad-estudiante.component.css']
})
export class VerActividadEstudianteComponent implements OnInit {
  actividad:Actividad;
  fi:string;
  fe:string;
  constructor(public dialogRef: MatDialogRef<VerActividadEstudianteComponent>) { }

  ngOnInit(): void {
    this.fi=this.actividad.fecha_inicio.toLocaleDateString();
    this.fe=this.actividad.fecha_entrega.toLocaleDateString();
  }

  okClick() {
    this.dialogRef.close();
  }
}
