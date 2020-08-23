import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-ver-seguimiento-estudiante',
  templateUrl: './ver-seguimiento-estudiante.component.html',
  styleUrls: ['./ver-seguimiento-estudiante.component.css']
})
export class VerSeguimientoEstudianteComponent implements OnInit {
  panelOpenState = false;

  constructor(public dialogRef: MatDialogRef<VerSeguimientoEstudianteComponent>) { }

  ngOnInit(): void {
  }

  okClick() {
    this.dialogRef.close();
  }
}
