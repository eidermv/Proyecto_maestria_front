import { TutorCompleto } from './../../../seguimientos_admin/modelos/tutorCompleto.model';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Seguimiento } from '../../../seguimientos_admin/modelos/seguimiento.model';
import { debounceTime } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Tutor } from '../../modelos/tutor.model';

@Component({
  selector: 'app-ver-tutor',
  templateUrl: './ver-tutor.component.html',
  styleUrls: ['./ver-tutor.component.scss']
})
export class VerTutorComponent implements OnInit {
  panelOpenState = false;
  tutor:TutorCompleto;
  formulario:FormGroup;
  texto:string="";
  objEspec:string[];

  constructor(public dialogRef: MatDialogRef<VerTutorComponent>,private formBuilder: FormBuilder) { }

  ngOnInit() {
    let oe:string="";
    let cont=1;
    this.objEspec=[];

    this.formulario = this.formBuilder.group(
      {
        nombre: [this.tutor.nombre+"", [Validators.required,
          Validators.maxLength(50)]
          ],
          apellido: [this.tutor.apellido, [Validators.required,
            Validators.maxLength(50)]
            ],
        identificacion: [this.tutor.identificacion, []],
        correo: [this.tutor.correo, [Validators.email]],
        telefono: [this.tutor.telefono, []],
        tipo: [this.tutor.tipo.nombre, []],
        departamento:[this.tutor.departamento,[]],
        universidad:[this.tutor.universidad,[]]
      });


      this.formulario.valueChanges.pipe(
        debounceTime(350)
        ).subscribe(
          value=>{})
  }
  okClick() {
    this.dialogRef.close();
  }

  separar()
  {

  }
  consultarSeguimiento()
  {
  }

}
