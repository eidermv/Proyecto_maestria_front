import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Tutor } from '../../../modelos/tutor.model';

@Component({
  selector: 'app-editar-tutor',
  templateUrl: './editar-tutor.component.html',
  styleUrls: ['./editar-tutor.component.scss']
})
export class EditarTutorComponent implements OnInit {

  formulario: FormGroup;
  externo:boolean=false;
  tutor:Tutor;
  defaultValue="";
  constructor(public dialogoReg:MatDialogRef<EditarTutorComponent>,private formBuilder: FormBuilder) {


  }
  ngOnInit(): void {
    this.defaultValue=this.tutor.tipo;
    this.formulario = this.formBuilder.group(
      {
        nombre: [this.tutor.nombre, [Validators.required,
          Validators.maxLength(50)]
          ],
        apellido: [this.tutor.apellido, [Validators.required,
          Validators.maxLength(50)]
          ],
        identificacion: [this.tutor.identificacion, [Validators.required]],
        telefono: [this.tutor.telefono, [Validators.required]],
        correo: [this.tutor.correo, [Validators.required,Validators.email]],
        grupoInvestigacion:[this.tutor.grupoInvestigacion,[Validators.required]],
        departamento:[this.tutor.departamento,[Validators.required]],
        tipo: [this.tutor.tipo,[Validators.required]],
        universidad:[this.tutor.universidad,[Validators.required]]
      });
      console.log("TUTOR:   ",this.tutor);
      this.formulario.get('tipo').valueChanges.subscribe(
          value=>{
            console.log("TIPO:  ",value);
            if(value==2)
            {
              this.externo=true;
              this.formulario.get('universidad').setValue('');              
            }
            else
            {
              this.externo=false;
              this.formulario.get('universidad').setValue('Universidad del Cauca');
            }
          }
        );
  }
  onSubmit(event:Event)
  {

      console.log("Guardado",event);
      Swal.fire({
        icon: 'success',
        title: 'Guardado' ,
        text: 'Tutor Editado!'/* ,
        footer: 'El tutor no fué almacenado' */
      });
      let nuevo :Tutor;
        nuevo={
            nombre:this.formulario.get('nombre').value,
            apellido:this.formulario.get('apellido').value,
            identificacion:this.formulario.get('identificacion').value,
            correo:this.formulario.get('correo').value,
            telefono:this.formulario.get('telefono').value,
            departamento:this.formulario.get('departamento').value,
            grupoInvestigacion:this.formulario.get('grupoInvestigacion').value,
            tipo:   this.formulario.get('tipo').value,
            universidad:this.formulario.get('universidad').value
        };
        //GUARDAR 
        this.dialogoReg.close();


  }
  onCancel()
  {
    Swal.fire({
      icon: 'error',
      title: 'Cancelado' ,
      text: 'Tutor no Editado!',
      footer: 'El tutor no fué Editado'
    });
    this.dialogoReg.close();

  }

}
