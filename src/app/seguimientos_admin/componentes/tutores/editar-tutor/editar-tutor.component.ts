import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Tutor } from '../../../modelos/tutor.model';
import { TipoTutor } from '../../../modelos/tipoTutor.model';
import { TutorService } from '../../../servicios/tutor.service';

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
  
  optionsTiposTutor:TipoTutor[]=[];
  constructor(public dialogoReg:MatDialogRef<EditarTutorComponent>,private formBuilder: FormBuilder,
    private tutorService:TutorService) {


  }
  ngOnInit(): void {
    this.optionsTiposTutor=this.tutorService.tiposTutor();
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
        telefono: [this.tutor.telefono, []],
        correo: [this.tutor.correo, [Validators.required,Validators.email]],
        grupoInvestigacion:[this.tutor.grupoInvestigacion,[]],
        departamento:[this.tutor.departamento,[]],
        tipo: [this.tutor.tipo,[Validators.required]],
        universidad:[this.tutor.universidad,[Validators.required]]
      });
      console.log("TUTOR:   ",this.tutor);
      this.formulario.get('tipo').valueChanges.subscribe(
          value=>{
            console.log("TIPO:  ",value);
            if(value.nombre!=null&& value.nombre==='Externo')
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
