import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-editar-actividad-tutor',
  templateUrl: './editar-actividad-tutor.component.html',
  styleUrls: ['./editar-actividad-tutor.component.css']
})
export class EditarActividadTutorComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditarActividadTutorComponent>) { }

  ngOnInit(): void {
  }
  okClick() {
    this.dialogRef.close();
  }

}
