import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Actividad } from '../../modelos/actividad.model';

@Component({
  selector: 'app-ver-actividades',
  templateUrl: './ver-actividades.component.html',
  styleUrls: ['./ver-actividades.component.scss']
})
export class VerActividadesComponent implements OnInit {
  actividad:Actividad;
  fi:string;
  fe:string;
  constructor(public dialogRef: MatDialogRef<VerActividadesComponent>) { }

  ngOnInit(): void {
    this.fi=this.actividad.fecha_inicio.toLocaleDateString();
    this.fe=this.actividad.fecha_entrega.toLocaleDateString();
  }

  okClick() {
    this.dialogRef.close();
  }

}
