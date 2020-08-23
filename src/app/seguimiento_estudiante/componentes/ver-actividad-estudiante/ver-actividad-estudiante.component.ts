import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-ver-actividad-estudiante',
  templateUrl: './ver-actividad-estudiante.component.html',
  styleUrls: ['./ver-actividad-estudiante.component.css']
})
export class VerActividadEstudianteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<VerActividadEstudianteComponent>) { }

  ngOnInit(): void {
  }

  okClick() {
    this.dialogRef.close();
  }
}
