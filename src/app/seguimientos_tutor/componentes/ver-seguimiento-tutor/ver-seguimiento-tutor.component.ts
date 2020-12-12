import { SeguimientoTutorCompleto } from './../../modelos/seguimientoTutorCompleto.model';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-ver-seguimiento-tutor',
  templateUrl: './ver-seguimiento-tutor.component.html',
  styleUrls: ['./ver-seguimiento-tutor.component.css']
})
export class VerSeguimientoTutorComponent implements OnInit {
  seguimiento: SeguimientoTutorCompleto;

  constructor(public dialogoReg:MatDialogRef<VerSeguimientoTutorComponent>,private formBuilder: FormBuilder) { }
  formulario:FormGroup;
  panelOpenState = false;
  ngOnInit(): void {
    this.formulario = this.formBuilder.group(
      {
        nombre: [{value:this.seguimiento.nombre, disabled:true},[]
        ],
        tipo: [{value:this.seguimiento.tipoSeguimiento.nombre, disabled:true}, []],
        tutor: [{value:this.seguimiento.tutor.nombre+' '+this.seguimiento.tutor.apellido, disabled:true}, []],
        estudiante: [{value:this.seguimiento.estudiante.nombres+' '+this.seguimiento.estudiante.apellidos, disabled:true}, []],
        estado: [{value:this.seguimiento.estadoSeguimiento.nombre,disabled:true}, []],
        coodirector: [{value: this.seguimiento.codirector, disabled:true}, []],
        objetivoGeneral:[{value: this.seguimiento.objetivoGeneral, disabled:true},[]],
        objetivosEspec:[{value:this.seguimiento.objetivosEspecificos, disabled:true},[]],
        cohorte: [{value: this.seguimiento.estudiante.cohorte, disabled:true}, []],
        estadoSeguimiento: [{value: this.seguimiento.estadoSeguimiento.nombre, disabled:true}, []],
      });
      this.formulario.valueChanges.pipe(
        debounceTime(350)
        ).subscribe(
          value=>{})
  }
  ok()
  {
    this.dialogoReg.close();
  }

}
