import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { debounceTime } from 'rxjs/operators';
import { Tutor } from '../../../seguimientos_admin/modelos/tutor.model';

@Component({
  selector: 'app-editar-tutor',
  templateUrl: './editar-tutor.component.html',
  styleUrls: ['./editar-tutor.component.scss']
})
export class EditarTutorComponent implements OnInit {

  panelOpenState = false;
  tutor:Tutor;
  formulario:FormGroup;
  texto:string="";
  objEspec:string[];
  
  constructor(public dialogRef: MatDialogRef<EditarTutorComponent>,private formBuilder: FormBuilder) { }

  ngOnInit() {
    let oe:string="";
    let cont=1;
    this.objEspec=[];
    console.log("Asignando tutor al form:  ",this.tutor);
    this.formulario = this.formBuilder.group(
      {
        nombre: [this.tutor.nombre+"", [Validators.required,
          Validators.maxLength(50)]
          ],
          apellido: [this.tutor.apellido, [Validators.required,
            Validators.maxLength(50)]
            ],
        identificacion: [this.tutor.identificacion, [Validators.required]],
        correo: [this.tutor.correo, [Validators.email,Validators.required]],
        telefono: [this.tutor.telefono, []],
        tipo: [this.tutor.tipo, []],
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
    console.log("PRESIONO ENTER")
  }
  consultarSeguimiento()
  {
  }


}
